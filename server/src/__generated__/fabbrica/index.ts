import type { User } from "@prisma/client";
import type { Profile } from "@prisma/client";
import type { Post } from "@prisma/client";
import type { Category } from "@prisma/client";
import type { Like } from "@prisma/client";
import type { Role } from "@prisma/client";
import type { Prisma, PrismaClient } from "@prisma/client";
import { createInitializer, createScreener, getScalarFieldValueGenerator, normalizeResolver, normalizeList, getSequenceCounter, } from "@quramy/prisma-fabbrica/lib/internal";
import type { ModelWithFields, Resolver, } from "@quramy/prisma-fabbrica/lib/internal";
export { resetSequence, registerScalarFieldValueGenerator, resetScalarFieldValueGenerator } from "@quramy/prisma-fabbrica/lib/internal";

type BuildDataOptions = {
    readonly seq: number;
};

const initializer = createInitializer();

const { getClient } = initializer;

export const { initialize } = initializer;

const modelFieldDefinitions: ModelWithFields[] = [{
        name: "User",
        fields: [{
                name: "profile",
                type: "Profile",
                relationName: "ProfileToUser"
            }, {
                name: "posts",
                type: "Post",
                relationName: "PostToUser"
            }, {
                name: "likes",
                type: "Like",
                relationName: "LikeToUser"
            }]
    }, {
        name: "Profile",
        fields: [{
                name: "user",
                type: "User",
                relationName: "ProfileToUser"
            }]
    }, {
        name: "Post",
        fields: [{
                name: "author",
                type: "User",
                relationName: "PostToUser"
            }, {
                name: "category",
                type: "Category",
                relationName: "CategoryToPost"
            }, {
                name: "likes",
                type: "Like",
                relationName: "LikeToPost"
            }]
    }, {
        name: "Category",
        fields: [{
                name: "posts",
                type: "Post",
                relationName: "CategoryToPost"
            }]
    }, {
        name: "Like",
        fields: [{
                name: "user",
                type: "User",
                relationName: "LikeToUser"
            }, {
                name: "post",
                type: "Post",
                relationName: "LikeToPost"
            }]
    }];

type UserScalarOrEnumFields = {
    name: string;
    email: string;
    password: string;
};

type UserprofileFactory = {
    _factoryFor: "Profile";
    build: () => PromiseLike<Prisma.ProfileCreateNestedOneWithoutUserInput["create"]>;
};

type UserFactoryDefineInput = {
    name?: string;
    email?: string;
    password?: string;
    image?: string | null;
    role?: Role;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date | null;
    profile?: UserprofileFactory | Prisma.ProfileCreateNestedOneWithoutUserInput;
    posts?: Prisma.PostCreateNestedManyWithoutAuthorInput;
    likes?: Prisma.LikeCreateNestedManyWithoutUserInput;
};

type UserFactoryDefineOptions = {
    defaultData?: Resolver<UserFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<UserFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isUserprofileFactory(x: UserprofileFactory | Prisma.ProfileCreateNestedOneWithoutUserInput | undefined): x is UserprofileFactory {
    return (x as any)?._factoryFor === "Profile";
}

type UserTraitKeys<TOptions extends UserFactoryDefineOptions> = keyof TOptions["traits"];

export interface UserFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "User";
    build(inputData?: Partial<Prisma.UserCreateInput>): PromiseLike<Prisma.UserCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.UserCreateInput>): PromiseLike<Prisma.UserCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.UserCreateInput>[]): PromiseLike<Prisma.UserCreateInput[]>;
    pickForConnect(inputData: User): Pick<User, "id">;
    create(inputData?: Partial<Prisma.UserCreateInput>): PromiseLike<User>;
    createList(inputData: number | readonly Partial<Prisma.UserCreateInput>[]): PromiseLike<User[]>;
    createForConnect(inputData?: Partial<Prisma.UserCreateInput>): PromiseLike<Pick<User, "id">>;
}

export interface UserFactoryInterface<TOptions extends UserFactoryDefineOptions = UserFactoryDefineOptions> extends UserFactoryInterfaceWithoutTraits {
    use(name: UserTraitKeys<TOptions>, ...names: readonly UserTraitKeys<TOptions>[]): UserFactoryInterfaceWithoutTraits;
}

function autoGenerateUserScalarsOrEnums({ seq }: {
    readonly seq: number;
}): UserScalarOrEnumFields {
    return {
        name: getScalarFieldValueGenerator().String({ modelName: "User", fieldName: "name", isId: false, isUnique: false, seq }),
        email: getScalarFieldValueGenerator().String({ modelName: "User", fieldName: "email", isId: false, isUnique: true, seq }),
        password: getScalarFieldValueGenerator().String({ modelName: "User", fieldName: "password", isId: false, isUnique: false, seq })
    };
}

function defineUserFactoryInternal<TOptions extends UserFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): UserFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly UserTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("User", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.UserCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateUserScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<UserFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<UserFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                profile: isUserprofileFactory(defaultData.profile) ? {
                    create: await defaultData.profile.build()
                } : defaultData.profile
            };
            const data: Prisma.UserCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.UserCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: User) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.UserCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().user.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.UserCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.UserCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "User" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: UserTraitKeys<TOptions>, ...names: readonly UserTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link User} model.
 *
 * @param options
 * @returns factory {@link UserFactoryInterface}
 */
export function defineUserFactory<TOptions extends UserFactoryDefineOptions>(options?: TOptions): UserFactoryInterface<TOptions> {
    return defineUserFactoryInternal(options ?? {});
}

type ProfileScalarOrEnumFields = {};

type ProfileuserFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutProfileInput["create"]>;
};

type ProfileFactoryDefineInput = {
    bio?: string | null;
    user: ProfileuserFactory | Prisma.UserCreateNestedOneWithoutProfileInput;
};

type ProfileFactoryDefineOptions = {
    defaultData: Resolver<ProfileFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<ProfileFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isProfileuserFactory(x: ProfileuserFactory | Prisma.UserCreateNestedOneWithoutProfileInput | undefined): x is ProfileuserFactory {
    return (x as any)?._factoryFor === "User";
}

type ProfileTraitKeys<TOptions extends ProfileFactoryDefineOptions> = keyof TOptions["traits"];

export interface ProfileFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Profile";
    build(inputData?: Partial<Prisma.ProfileCreateInput>): PromiseLike<Prisma.ProfileCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.ProfileCreateInput>): PromiseLike<Prisma.ProfileCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.ProfileCreateInput>[]): PromiseLike<Prisma.ProfileCreateInput[]>;
    pickForConnect(inputData: Profile): Pick<Profile, "id">;
    create(inputData?: Partial<Prisma.ProfileCreateInput>): PromiseLike<Profile>;
    createList(inputData: number | readonly Partial<Prisma.ProfileCreateInput>[]): PromiseLike<Profile[]>;
    createForConnect(inputData?: Partial<Prisma.ProfileCreateInput>): PromiseLike<Pick<Profile, "id">>;
}

export interface ProfileFactoryInterface<TOptions extends ProfileFactoryDefineOptions = ProfileFactoryDefineOptions> extends ProfileFactoryInterfaceWithoutTraits {
    use(name: ProfileTraitKeys<TOptions>, ...names: readonly ProfileTraitKeys<TOptions>[]): ProfileFactoryInterfaceWithoutTraits;
}

function autoGenerateProfileScalarsOrEnums({ seq }: {
    readonly seq: number;
}): ProfileScalarOrEnumFields {
    return {};
}

function defineProfileFactoryInternal<TOptions extends ProfileFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): ProfileFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly ProfileTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Profile", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.ProfileCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateProfileScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<ProfileFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<ProfileFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                user: isProfileuserFactory(defaultData.user) ? {
                    create: await defaultData.user.build()
                } : defaultData.user
            };
            const data: Prisma.ProfileCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.ProfileCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Profile) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.ProfileCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().profile.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.ProfileCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.ProfileCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Profile" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: ProfileTraitKeys<TOptions>, ...names: readonly ProfileTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Profile} model.
 *
 * @param options
 * @returns factory {@link ProfileFactoryInterface}
 */
export function defineProfileFactory<TOptions extends ProfileFactoryDefineOptions>(options: TOptions): ProfileFactoryInterface<TOptions> {
    return defineProfileFactoryInternal(options);
}

type PostScalarOrEnumFields = {
    title: string;
    content: string;
};

type PostauthorFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutPostsInput["create"]>;
};

type PostcategoryFactory = {
    _factoryFor: "Category";
    build: () => PromiseLike<Prisma.CategoryCreateNestedOneWithoutPostsInput["create"]>;
};

type PostFactoryDefineInput = {
    title?: string;
    content?: string;
    published?: boolean;
    createdAt?: Date;
    updatedAt?: Date | null;
    author: PostauthorFactory | Prisma.UserCreateNestedOneWithoutPostsInput;
    category: PostcategoryFactory | Prisma.CategoryCreateNestedOneWithoutPostsInput;
    likes?: Prisma.LikeCreateNestedManyWithoutPostInput;
};

type PostFactoryDefineOptions = {
    defaultData: Resolver<PostFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<PostFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isPostauthorFactory(x: PostauthorFactory | Prisma.UserCreateNestedOneWithoutPostsInput | undefined): x is PostauthorFactory {
    return (x as any)?._factoryFor === "User";
}

function isPostcategoryFactory(x: PostcategoryFactory | Prisma.CategoryCreateNestedOneWithoutPostsInput | undefined): x is PostcategoryFactory {
    return (x as any)?._factoryFor === "Category";
}

type PostTraitKeys<TOptions extends PostFactoryDefineOptions> = keyof TOptions["traits"];

export interface PostFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Post";
    build(inputData?: Partial<Prisma.PostCreateInput>): PromiseLike<Prisma.PostCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.PostCreateInput>): PromiseLike<Prisma.PostCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.PostCreateInput>[]): PromiseLike<Prisma.PostCreateInput[]>;
    pickForConnect(inputData: Post): Pick<Post, "id">;
    create(inputData?: Partial<Prisma.PostCreateInput>): PromiseLike<Post>;
    createList(inputData: number | readonly Partial<Prisma.PostCreateInput>[]): PromiseLike<Post[]>;
    createForConnect(inputData?: Partial<Prisma.PostCreateInput>): PromiseLike<Pick<Post, "id">>;
}

export interface PostFactoryInterface<TOptions extends PostFactoryDefineOptions = PostFactoryDefineOptions> extends PostFactoryInterfaceWithoutTraits {
    use(name: PostTraitKeys<TOptions>, ...names: readonly PostTraitKeys<TOptions>[]): PostFactoryInterfaceWithoutTraits;
}

function autoGeneratePostScalarsOrEnums({ seq }: {
    readonly seq: number;
}): PostScalarOrEnumFields {
    return {
        title: getScalarFieldValueGenerator().String({ modelName: "Post", fieldName: "title", isId: false, isUnique: false, seq }),
        content: getScalarFieldValueGenerator().String({ modelName: "Post", fieldName: "content", isId: false, isUnique: false, seq })
    };
}

function definePostFactoryInternal<TOptions extends PostFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): PostFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly PostTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Post", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.PostCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGeneratePostScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<PostFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<PostFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                author: isPostauthorFactory(defaultData.author) ? {
                    create: await defaultData.author.build()
                } : defaultData.author,
                category: isPostcategoryFactory(defaultData.category) ? {
                    create: await defaultData.category.build()
                } : defaultData.category
            };
            const data: Prisma.PostCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.PostCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Post) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.PostCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().post.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.PostCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.PostCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Post" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: PostTraitKeys<TOptions>, ...names: readonly PostTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Post} model.
 *
 * @param options
 * @returns factory {@link PostFactoryInterface}
 */
export function definePostFactory<TOptions extends PostFactoryDefineOptions>(options: TOptions): PostFactoryInterface<TOptions> {
    return definePostFactoryInternal(options);
}

type CategoryScalarOrEnumFields = {
    slug: string;
};

type CategoryFactoryDefineInput = {
    slug?: string;
    createdAt?: Date;
    updatedAt?: Date | null;
    posts?: Prisma.PostCreateNestedManyWithoutCategoryInput;
};

type CategoryFactoryDefineOptions = {
    defaultData?: Resolver<CategoryFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<CategoryFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

type CategoryTraitKeys<TOptions extends CategoryFactoryDefineOptions> = keyof TOptions["traits"];

export interface CategoryFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Category";
    build(inputData?: Partial<Prisma.CategoryCreateInput>): PromiseLike<Prisma.CategoryCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.CategoryCreateInput>): PromiseLike<Prisma.CategoryCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.CategoryCreateInput>[]): PromiseLike<Prisma.CategoryCreateInput[]>;
    pickForConnect(inputData: Category): Pick<Category, "id">;
    create(inputData?: Partial<Prisma.CategoryCreateInput>): PromiseLike<Category>;
    createList(inputData: number | readonly Partial<Prisma.CategoryCreateInput>[]): PromiseLike<Category[]>;
    createForConnect(inputData?: Partial<Prisma.CategoryCreateInput>): PromiseLike<Pick<Category, "id">>;
}

export interface CategoryFactoryInterface<TOptions extends CategoryFactoryDefineOptions = CategoryFactoryDefineOptions> extends CategoryFactoryInterfaceWithoutTraits {
    use(name: CategoryTraitKeys<TOptions>, ...names: readonly CategoryTraitKeys<TOptions>[]): CategoryFactoryInterfaceWithoutTraits;
}

function autoGenerateCategoryScalarsOrEnums({ seq }: {
    readonly seq: number;
}): CategoryScalarOrEnumFields {
    return {
        slug: getScalarFieldValueGenerator().String({ modelName: "Category", fieldName: "slug", isId: false, isUnique: true, seq })
    };
}

function defineCategoryFactoryInternal<TOptions extends CategoryFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): CategoryFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly CategoryTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Category", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.CategoryCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateCategoryScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<CategoryFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<CategoryFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {};
            const data: Prisma.CategoryCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.CategoryCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Category) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.CategoryCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().category.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.CategoryCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.CategoryCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Category" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: CategoryTraitKeys<TOptions>, ...names: readonly CategoryTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Category} model.
 *
 * @param options
 * @returns factory {@link CategoryFactoryInterface}
 */
export function defineCategoryFactory<TOptions extends CategoryFactoryDefineOptions>(options?: TOptions): CategoryFactoryInterface<TOptions> {
    return defineCategoryFactoryInternal(options ?? {});
}

type LikeScalarOrEnumFields = {};

type LikeuserFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutLikesInput["create"]>;
};

type LikepostFactory = {
    _factoryFor: "Post";
    build: () => PromiseLike<Prisma.PostCreateNestedOneWithoutLikesInput["create"]>;
};

type LikeFactoryDefineInput = {
    createdAt?: Date;
    updatedAt?: Date | null;
    user: LikeuserFactory | Prisma.UserCreateNestedOneWithoutLikesInput;
    post: LikepostFactory | Prisma.PostCreateNestedOneWithoutLikesInput;
};

type LikeFactoryDefineOptions = {
    defaultData: Resolver<LikeFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<LikeFactoryDefineInput>, BuildDataOptions>;
        };
    };
};

function isLikeuserFactory(x: LikeuserFactory | Prisma.UserCreateNestedOneWithoutLikesInput | undefined): x is LikeuserFactory {
    return (x as any)?._factoryFor === "User";
}

function isLikepostFactory(x: LikepostFactory | Prisma.PostCreateNestedOneWithoutLikesInput | undefined): x is LikepostFactory {
    return (x as any)?._factoryFor === "Post";
}

type LikeTraitKeys<TOptions extends LikeFactoryDefineOptions> = keyof TOptions["traits"];

export interface LikeFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Like";
    build(inputData?: Partial<Prisma.LikeCreateInput>): PromiseLike<Prisma.LikeCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.LikeCreateInput>): PromiseLike<Prisma.LikeCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.LikeCreateInput>[]): PromiseLike<Prisma.LikeCreateInput[]>;
    pickForConnect(inputData: Like): Pick<Like, "userId" | "postId">;
    create(inputData?: Partial<Prisma.LikeCreateInput>): PromiseLike<Like>;
    createList(inputData: number | readonly Partial<Prisma.LikeCreateInput>[]): PromiseLike<Like[]>;
    createForConnect(inputData?: Partial<Prisma.LikeCreateInput>): PromiseLike<Pick<Like, "userId" | "postId">>;
}

export interface LikeFactoryInterface<TOptions extends LikeFactoryDefineOptions = LikeFactoryDefineOptions> extends LikeFactoryInterfaceWithoutTraits {
    use(name: LikeTraitKeys<TOptions>, ...names: readonly LikeTraitKeys<TOptions>[]): LikeFactoryInterfaceWithoutTraits;
}

function autoGenerateLikeScalarsOrEnums({ seq }: {
    readonly seq: number;
}): LikeScalarOrEnumFields {
    return {};
}

function defineLikeFactoryInternal<TOptions extends LikeFactoryDefineOptions>({ defaultData: defaultDataResolver, traits: traitsDefs = {} }: TOptions): LikeFactoryInterface<TOptions> {
    const getFactoryWithTraits = (traitKeys: readonly LikeTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Like", modelFieldDefinitions);
        const build = async (inputData: Partial<Prisma.LikeCreateInput> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateLikeScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<LikeFactoryDefineInput, BuildDataOptions>(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<LikeFactoryDefineInput>, BuildDataOptions>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {
                user: isLikeuserFactory(defaultData.user) ? {
                    create: await defaultData.user.build()
                } : defaultData.user,
                post: isLikepostFactory(defaultData.post) ? {
                    create: await defaultData.post.build()
                } : defaultData.post
            };
            const data: Prisma.LikeCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData: number | readonly Partial<Prisma.LikeCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => build(data)));
        const pickForConnect = (inputData: Like) => ({
            userId: inputData.userId,
            postId: inputData.postId
        });
        const create = async (inputData: Partial<Prisma.LikeCreateInput> = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient<PrismaClient>().like.create({ data });
        };
        const createList = (inputData: number | readonly Partial<Prisma.LikeCreateInput>[]) => Promise.all(normalizeList(inputData).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.LikeCreateInput> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Like" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: LikeTraitKeys<TOptions>, ...names: readonly LikeTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

/**
 * Define factory for {@link Like} model.
 *
 * @param options
 * @returns factory {@link LikeFactoryInterface}
 */
export function defineLikeFactory<TOptions extends LikeFactoryDefineOptions>(options: TOptions): LikeFactoryInterface<TOptions> {
    return defineLikeFactoryInternal(options);
}
