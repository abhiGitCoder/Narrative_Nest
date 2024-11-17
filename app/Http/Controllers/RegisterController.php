<?php

namespace App\Http\Controllers;

use App\Models\Register;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Illuminate\Validation\ValidationException;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
     try {
        $validated = $request->validate([
            'name' => 'required|min:3|max:50',
            'username' => 'required|unique:registers|min:3|max:50',
            'email' => 'required|email|unique:registers',
            'password' => 'required|min:6|confirmed',
        ]);

        // Hash the password
        $validated['password'] = Hash::make($validated['password']);

        // Create the user
        $user = Register::create($validated);

        // Return success response
        return response()->json([
            'status' => 'success',
            'message' => 'User registered successfully',
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name, // Corrected here
                    'username' => $user->username,
                    'email' => $user->email,
                    'created_at' => $user->created_at
                ]
            ]
        ], 201);

    } catch (ValidationException $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Validation failed',
            'errors' => $e->errors()
        ], 422);

    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Registration failed',
            'error' => $e->getMessage()
        ], 500);
    }
}

    public function login(Request $request)
    {
        try {
            $request->validate([
                'login' => 'required|string', // This will accept either username or email
                'password' => 'required|string',
            ]);

            // Check if login field is email or username
            $loginField = filter_var($request->login, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
            $credentials = [
                $loginField => $request->login,
                'password' => $request->password
            ];

            // Generate token
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid credentials'
                ], 401);
            }

            // Get authenticated user
            $user = JWTAuth::user();

            return response()->json([
                'status' => 'success',
                'message' => 'Login successful',
                'data' => [
                    'authorization' => [
                        'token' => $token,
                    ]
                ]
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Login failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function logout()
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());

            return response()->json([
                'status' => 'success',
                'message' => 'Successfully logged out'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Logout failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function refresh()
    {
        try {
            $token = JWTAuth::refresh(JWTAuth::getToken());
            $user = JWTAuth::setToken($token)->toUser();

            return response()->json([
                'status' => 'success',
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'username' => $user->username,
                        'email' => $user->email,
                    ],
                    'authorization' => [
                        'token' => $token,
                    ]
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Token refresh failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getUser()
{
    try {
        // Get authenticated user
        $user = JWTAuth::parseToken()->authenticate();
        
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'username' => $user->username,
                    'email' => $user->email,
                    'created_at' => $user->created_at
                ]
            ]
        ]);

    } catch (\PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Token has expired'
        ], 401);
        
    } catch (\PHPOpenSourceSaver\JWTAuth\Exceptions\TokenInvalidException $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Token is invalid'
        ], 401);
        
    } catch (\PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Authorization token not found'
        ], 401);
        
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Failed to get user data',
            'error' => $e->getMessage()
        ], 500);
    }
}
public function checkSession()
    {
        try {
            // Attempt to get the authenticated user
            $user = JWTAuth::parseToken()->authenticate();
            
            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'User not found',
                    'isValid' => false
                ], 404);
            }

            // Get token instance
            $token = JWTAuth::getToken();
            
            // Get token payload
            $payload = JWTAuth::getPayload($token)->toArray();
            
            // Calculate remaining time
            $expiresAt = $payload['exp'];
            $currentTime = time();
            $remainingTime = $expiresAt - $currentTime;

            return response()->json([
                'status' => 'success',
                'message' => 'Session is valid',
                'data' => [
                    'isValid' => true,
                    'expiresIn' => $remainingTime,
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'username' => $user->username,
                        'email' => $user->email
                    ]
                ]
            ]);

        } catch (TokenExpiredException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Token has expired',
                'isValid' => false,
                'error' => 'token_expired'
            ], 401);
            
        } catch (TokenInvalidException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Token is invalid',
                'isValid' => false,
                'error' => 'token_invalid'
            ], 401);
            
        } catch (JWTException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Token is missing',
                'isValid' => false,
                'error' => 'token_missing'
            ], 401);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Session check failed',
                'isValid' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }
}