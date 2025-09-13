<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\HandleCors;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

$app = Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // CORS を全体に
        $middleware->append(HandleCors::class);

        // SPA(Cookie)向けSanctum
        $middleware->appendToGroup('api', EnsureFrontendRequestsAreStateful::class);

        // ★ 追加：Fortifyの login/logout は「web」経由なので、web にも適用
        $middleware->appendToGroup('web', EnsureFrontendRequestsAreStateful::class);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();

$app->register(App\Providers\FortifyServiceProvider::class);

return $app;