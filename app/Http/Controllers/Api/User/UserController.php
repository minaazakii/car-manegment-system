<?php

namespace App\Http\Controllers\Api\User;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\User\StoreUserRequest;
use App\Http\Requests\Api\User\UpdateUserRequest;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();

        return response()->json(['users' => UserResource::collection($users)]);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json(['user' => new UserResource($user)]);
    }

    public function store(StoreUserRequest $request)
    {
        $user = User::create($request->validated());
        return response()->json(
            [
                'message' => 'User Created Successfully',
                'user' => new UserResource($user)
            ]
        );
    }

    public function update(UpdateUserRequest $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update($request->validated());
        return response()->json(
            [
                'message' => 'User Updated Successfully',
                'user' => new UserResource($user)
            ]
        );
    }

    public function destroy($id)
    {
        User::findOrFail($id)->delete();
        return response()->json(['message' => 'User Deleted Successfully']);
    }
}
