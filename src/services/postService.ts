import { prisma } from "../lib/prisma.js";
import { CreatePostInput, UpdatePostInput } from "../types.js";

export const getPosts = async () => {
    return prisma.post.findMany({

        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
};

export const getOnePost = async (id: string) => {
    return prisma.post.findUnique({
        where: { id },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
};

export const createPostService = async (input: CreatePostInput) => {
    return prisma.post.create({
        data: {
            title: input.title,
            content: input.content,
            published: input.published,
            author: {
                connect: {
                    id: input.authorId,
                },
            },
        },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },

    });
};

export const deletePostService = async (id: string) => {
    return prisma.post.delete({
        where: { id },
    });
};

export const updatePostService = async(id: string, input: UpdatePostInput) => {
    return prisma.post.update({
        where: { id },
        data: {
            title: input.title ?? undefined,
            content: input.content ?? undefined,
            published: typeof input.published === "boolean" ? input.published : undefined,
            ...(input.authorId && {
                author: {
                    connect: {
                        id: input.authorId,
                    },
                },
            }),
        },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
};