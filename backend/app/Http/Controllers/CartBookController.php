<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\CartBook;
use Illuminate\Http\Request;
use App\Http\Resources\CartBookResource;
use App\Http\Resources\CartBookCollection;
use Illuminate\Support\Facades\Validator;
use App\Http\Controller\AuthController;
 

class CartBookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cartBook = CartBook::all();

        return new CartBookCollection($cartBooks);
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
            'amount' => 'required|int'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $cartBook = CartBook::create([
            'title' => $request->title,
            'author' => $request->author,
            'genre_id' => $request->genre_id,
            'user_id' => Auth::user()->id,
            'amount' => $request->amount
        ]);

        return response()->json(['Book added to cart successfully', new CartBookResource($cartBook)]);
    }

    /**
     * Display the specified resource.
     */
    public function show(CartBook $cartBook)
    {
        return new CartBookResource($cartBook);
    }

    public function update(Request $request, CartBook $cartBook)
    {
        $validator = Validator::make($request->all(),[
            'amount' => 'required|int'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $cartBook->amount = $request->amount;
        $cartBookBook->user_id = Auth::user()->id;

        $cartBook->save();
        return response()->json(['Cart edited successfully', new CartBookResource($cartBook)]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($cartBook_id)
    {
        $cartBook = CartBook::where('id', $cartBook_id) ->delete();
        return response()->json('Book removed from cart successfully');
    }
}
