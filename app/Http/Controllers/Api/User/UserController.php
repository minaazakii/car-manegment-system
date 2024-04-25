<?php

namespace App\Http\Controllers\Api\User;

use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\User\StoreUserRequest;
use App\Http\Requests\Api\User\UpdateUserRequest;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    private UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index(): JsonResponse
    {
        $users = $this->userService->getUsers();

        return response()->json(['users' => UserResource::collection($users)]);
    }

    public function show($id): JsonResponse
    {
        $user = $this->userService->getSingleUser($id);
        return response()->json(['user' => new UserResource($user)]);
    }

    public function store(StoreUserRequest $request): JsonResponse
    {
        $user = $this->userService->createUser($request->validated());
        return response()->json(
            [
                'message' => 'User Created Successfully',
                'user' => new UserResource($user)
            ]
        );
    }

    public function update(UpdateUserRequest $request, $id): JsonResponse
    {
        $user = $this->userService->updateUser($request->validated(), $id);
        return response()->json(
            [
                'message' => 'User Updated Successfully',
                'user' => new UserResource($user)
            ]
        );
    }

    public function destroy($id): JsonResponse
    {
        $this->userService->deleteUser($id);
        return response()->json(['message' => 'User Deleted Successfully']);
    }
}
