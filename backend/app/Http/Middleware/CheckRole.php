<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(Auth::check()){
            if(auth()->user()->role_id == 1){
                return $next($request);
            }
            else {
                return response()->json([
                    'message' => 'Access denied! You are not an Admin.',
                ], 403);
            }
        }
        else {
            return response()->json([
                'message' => 'Access denied! User must be logged in.',
            ], 403);
        }
    }
}
