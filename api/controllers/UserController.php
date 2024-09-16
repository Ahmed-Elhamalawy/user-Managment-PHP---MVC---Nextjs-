<?php
namespace controllers;

use config\Database;
use models\User;

class UserController {
    private $db;
    private $user;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->user = new User($this->db);
    }

    public function getAllUsers() {
        $stmt = $this->user->read();
        $users = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        return json_encode($users);
    }

    public function getUser($id) {
        $this->user->id = $id;
        $this->user->readOne();
        return json_encode([
            "id" => $this->user->id,
            "name" => $this->user->name,
            "email" => $this->user->email,
            "mobile" => $this->user->mobile,
            "created_at" => $this->user->created_at,
            "updated_at" => $this->user->updated_at
        ]);
    }

    public function createUser() {
        $data = json_decode(file_get_contents("php://input"));
        
        $this->user->name = $data->name;
        $this->user->email = $data->email;
        $this->user->mobile = $data->mobile;

        if($this->user->create()) {
            return json_encode(["status" => 1, "message" => "User created successfully."]);
        } else {
            return json_encode(["status" => 0, "message" => "Failed to create user."]);
        }
    }

    public function updateUser($id) {
        $data = json_decode(file_get_contents("php://input"));
        
        $this->user->id = $id;
        $this->user->name = $data->name;
        $this->user->email = $data->email;
        $this->user->mobile = $data->mobile;

        if($this->user->update()) {
            return json_encode(["status" => 1, "message" => "User updated successfully."]);
        } else {
            return json_encode(["status" => 0, "message" => "Failed to update user."]);
        }
    }

    public function deleteUser($id) {
        $this->user->id = $id;

        if($this->user->delete()) {
            return json_encode(["status" => 1, "message" => "User deleted successfully."]);
        } else {
            return json_encode(["status" => 0, "message" => "Failed to delete user."]);
        }
    }
}