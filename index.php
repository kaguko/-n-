<?php
/**
 * Main Index File - File chính điều hướng routing
 */

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include config files
require_once 'config/database.php';
require_once 'config/functions.php';

// Get page parameter
$page = isset($_GET['page']) ? $_GET['page'] : 'home';

// Whitelist pages
$allowed_pages = [
    'home',
    'products',
    'product-detail',
    'cart',
    'checkout',
    'login',
    'register',
    'logout',
    'add-to-cart',
    'order-success',
    'orders'
];

// Check if page exists
if (!in_array($page, $allowed_pages)) {
    $page = 'home';
}

// Build page file path
$page_file = __DIR__ . "/pages/{$page}.php";

// Xử lý các trang có redirect/logic trước (không output HTML)
$no_layout_pages = ['logout', 'add-to-cart'];
if (in_array($page, $no_layout_pages)) {
    if (file_exists($page_file)) {
        include $page_file;
        exit(); // Dừng ngay sau khi xử lý
    }
}

// Xử lý login POST trước khi include header (để tránh lỗi headers already sent)
if ($page === 'login' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    if (file_exists($page_file)) {
        include $page_file;
        exit();
    }
}

// Xử lý register POST trước khi include header
if ($page === 'register' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    if (file_exists($page_file)) {
        include $page_file;
        exit();
    }
}

// Xử lý checkout POST hoặc giỏ hàng trống trước khi include header
if ($page === 'checkout') {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' || empty(get_cart())) {
        if (file_exists($page_file)) {
            include $page_file;
            exit();
        }
    }
}

// Xử lý cart POST trước khi include header
if ($page === 'cart' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    if (file_exists($page_file)) {
        include $page_file;
        exit();
    }
}

// Include header
include 'includes/header.php';

// Include page content
if (file_exists($page_file)) {
    include $page_file;
} else {
    echo '<div class="container my-5">';
    echo '<div class="alert alert-danger">Trang không tồn tại!</div>';
    echo '<a href="' . base_url('index.php') . '" class="btn btn-primary">Về trang chủ</a>';
    echo '</div>';
}

// Include footer
include 'includes/footer.php';
