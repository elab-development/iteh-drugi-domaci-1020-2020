<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Book;
use Illuminate\Http\Request;
use App\Http\Resources\BookResource;
use App\Http\Resources\BookCollection;
use Illuminate\Support\Facades\Validator;
use App\Http\Controller\AuthController;
 

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $books = Book::all();

        return new BookCollection($books);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:100',
            'genre_id' => 'required',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $book = Book::create([
            'title' => $request->title,
            'author' => $request->author,
            'genre_id' => $request->genre_id,
            'user_id' => Auth::user()->id,
        ]);

        return response()->json(['Book added successfully', new BookResource($book)]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        return new BookResource($book);
    }

    public function update(Request $request, Book $book)
    {
        $validator = Validator::make($request->all(),[
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:100',
            'genre_id' => 'required',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $book->title = $request->title;
        $book->author = $request->author;
        $book->genre_id = $request->genre_id;
        $book->user_id = Auth::user()->id;

        $book->save();
        return response()->json(['Book edited successfully', new BookResource($book)]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($book_id)
    {
        $book = Book::where('id', $book_id) ->delete();
        return response()->json('Book removed successfully');
    }
}
