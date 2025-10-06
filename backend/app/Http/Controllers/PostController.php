<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class PostController extends Controller implements HasMiddleware
{

    public static function middleware(): array
    {
        return [
            new Middleware(middleware: 'auth', except: ['index', 'show']),
        ];
    }

    /**
     * Display a listing of the resource.
     */

    public function index(Request $request)
    {
        $params = $request->only("page", "search");

        $posts = Post::with("categories", "author")->where("title", "like", "%" . ($params["search"] ?? '') . "%")
            ->orWhere("content", "like", "%" . ($params["search"] ?? '') . "%");

        if ($params["page"] ?? false) {
            return $posts->paginate();
        }

        return PostResource::collection($posts->get());
    }

    public function authorPosts(Request $request)
    {
        $authorId = auth()->user()->id;
        $params = $request->only("page", "search");

        $posts = Post::with("categories", "author")->where("author_id", $authorId);

        if ($params["page"] ?? false) {
            return $posts->paginate();
        }

        return PostResource::collection($posts->get());
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $postFields = $request->only("title", "content", "categories");

        $postFields['author_id'] = auth()->user()->id;
        $post = Post::create($postFields);

        $post->categories()->sync($postFields['categories']);

        return $post;
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        $post->categories;
        $post->author;
        return new PostResource($post);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $postFields = $request->only("title", "content", "categories");

        $post->update($postFields);
        $post->categories()->sync($postFields['categories']);

        return new PostResource($post);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        return $post->delete();
    }
}
