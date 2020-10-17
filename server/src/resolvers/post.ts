import {Resolver, Query, Ctx, Int, Arg, Mutation} from 'type-graphql';
import {Post} from '../entities/Post';
import {myContext} from '../types';

@Resolver() 
export class PostResolver {
    
    @Query(() => [Post])
    posts(@Ctx() {em}: myContext): Promise<Post[]>{
        return em.find(Post, {});
    }

    @Query(() => Post, {nullable: true})
    post(
        @Arg('id', ()=> Int) id: number,
        @Ctx() {em}: myContext): Promise<Post | null > {
        return em.findOne(Post, { id });
    }

    @Mutation(() => Post)
    async createPost(
        @Arg('title') title: string,
        @Ctx() {em}: myContext): Promise<Post | null > {
        const post = em.create(Post, {title});
        await em.persistAndFlush(post);
        return post;
    }

    @Mutation(() => Post)
    async updatePost(
        @Arg("id") id: number,
        @Arg('title', () => String, {nullable: true}) title: string,
        @Ctx() {em}: myContext): Promise<Post | null > {
        const post = await em.findOne(Post, {id});
       
        if (!post) {
            return null;
        } 
        
        if (typeof title !== "undefined") {
            post.title = title;
            await em.persistAndFlush(post);
        }

        return post;
    } 

    @Mutation(() => Boolean)
    async deletePost(
        @Arg("id") id: number,
        @Ctx() {em}: myContext): Promise<Boolean> {
        await em.nativeDelete(Post, {id});
        return true;
    } 
}