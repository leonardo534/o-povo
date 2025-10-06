<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        Post::create([
            'title' => 'Meu titulo 1',
            'content' => 'Meu conteudo 1',
            'author_id' => 1,
        ]);
        Post::create([
            'title' => 'Meu titulo 1',
            'content' => 'Meu conteudo 1',
            'author_id' => 1,
        ]);
        Post::create([
            'title' => 'Meu titulo 2',
            'content' => 'Meu conteudo 2',
            'author_id' => 2,
        ]);
        // Post::create([
        //     'title' => 'Meu titulo 3',
        //     'content' => 'Meu conteudo 3',
        //     'author_id' => 2,
        // ]);
        // Post::create([
        //     'title' => 'Meu titulo 4',
        //     'content' => 'Meu conteudo 4',
        //     'author_id' => 3,
        // ]);
        // Post::create([
        //     'title' => 'Meu titulo 5',
        //     'content' => 'Meu conteudo 5',
        //     'author_id' => 3,
        // ]);
    }
}
