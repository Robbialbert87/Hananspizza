<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('menu_items', function (Blueprint $table) {
            $table->string('gofood_link')->nullable()->after('image');
            $table->string('grabfood_link')->nullable()->after('gofood_link');
            $table->string('shopeefood_link')->nullable()->after('grabfood_link');
            $table->string('whatsapp_link')->nullable()->after('shopeefood_link');
        });
    }

    public function down(): void
    {
        Schema::table('menu_items', function (Blueprint $table) {
            $table->dropColumn(['gofood_link', 'grabfood_link', 'shopeefood_link', 'whatsapp_link']);
        });
    }
};
