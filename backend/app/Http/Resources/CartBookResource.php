<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public static $wrap = 'book';

    public function toArray(Request $request)
    {
        return [
                'id' => $this->resource->id,
                'title' => $this->resource->title,
                'author' => $this->resource->author,
                'genre' => $this->resource->genre,
                'amount' => $this->resource->amount
        ];
    }
}
