<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\User;

// Changer le premier utilisateur en admin
$user = User::first();
if ($user) {
    $user->update(['role' => 'admin']);
    echo "Utilisateur {$user->email} est maintenant admin!\n";
} else {
    echo "Aucun utilisateur trouvé.\n";
}
