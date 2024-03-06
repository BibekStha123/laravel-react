<?php

namespace App\Http\Controllers\api;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::paginate(10);
        return UserResource::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $input = $request->validated();

        $user = User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => bcrypt($input['password'])
        ]);

        return response([
            'user' => new UserResource($user),
            'message' => 'User Created Successfully'
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
        return response([
            'user' => new UserResource($user)
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $input = $request->validated();

        if(isset($input['password'])) {
            $input['password'] = bcrypt($input['password']);
        }

        $user->update($input);

        return response([
            'user' => new UserResource($user),
            'message' => 'User Updated Successfully'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
        $user->delete();

        return response([
            'message' => 'User Deleted Successfully'
        ], 200);
    }
}
