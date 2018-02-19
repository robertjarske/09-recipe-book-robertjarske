<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\RegisterFormRequest;
use App\User;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }
    
    public function register(RegisterFormRequest $request)
    {
        $user = new User;
        
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();


        // dd($request->only('email', 'password'));
        // $credentials = $request->only('email', 'password');

        // if (! $token = auth()->attempt($credentials)) {
        //     return response([
        //         'status' => 'error',
        //         'error' => 'invalid.credentials',
        //         'message' => 'Invalid credentials'
        //     ], 401);
        // }

        // return $this->respondWithToken($token);

        return response([
            'status' => 'success',
            'data' => $user
        ], 200);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (! $token = auth()->attempt($credentials)) {
            return response([
                'status' => 'error',
                'error' => 'invalid.credentials',
                'message' => 'Invalid credentials'
            ], 401);
        }

        return $this->respondWithToken($token);
    }

    public function logout()
    {
        auth()->logout();
        return response([
            'status' => 'success',
            'message' => 'Successfully logged out'
        ], 200);
    }

    public function user(Request $request)
    {
        $user = User::find(Auth::user()->id);

        return response([
            'status' => 'success',
            'data' => auth()->user()
        ], 200);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'status' => 'success',
            'data' => [
                "access_token" => $token,
                "token_type" => "Bearer",
                "expires_in" => auth()->factory()->getTTL() * 60
            ]
        ]);
    }
}
