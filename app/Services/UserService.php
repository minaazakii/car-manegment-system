<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class UserService
{
    public function getUsers(): Collection
    {
        $users = User::all();
        return $users;
    }

    public function getSingleUser($id): User
    {
        $user = User::findOrFail($id);
        return $user;
    }

    public function createUser($data): User
    {
        $user = User::create($data);
        return $user;
    }

    public function updateUser($data, $id): User
    {
        $user = User::findOrFail($id);
        $user->update($data);
        return $user;
    }

    public function deleteUser($id): void
    {
        User::findOrFail($id)->delete();

    }
}
