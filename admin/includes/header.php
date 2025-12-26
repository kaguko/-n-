<?php
/**
 * Header - Phần đầu trang web
 */
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($page_title) ? e($page_title) . ' - ' : ''; ?>Laptop Store</title>
    <title><?php echo isset($page_title) ? e($page_title) . ' - ' : ''; ?>Admin Panel</title>
    
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="<?php echo base_url('assets/css/style.css'); ?>">
    
    <style>
        :root {
            --primary-color: #007bff;
            --secondary-color: #6c757d;
            --success-color: #28a745;
            --danger-color: #dc3545;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        
        .navbar {
            box-shadow: 0 2px 4px rgba(0,0,0,.1);
        }
        
        .product-card {
            transition: transform 0.3s, box-shadow 0.3s;
            height: 100%;
        }
        
        .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 4px 15px rgba(0,0,0,.2);
        }
        
        .product-image {
            height: 200px;
            object-fit: cover;
        }
        
        .price {
            color: var(--danger-color);
            font-size: 1.25rem;
            font-weight: bold;
        }
        
        .old-price {
            text-decoration: line-through;
            color: var(--secondary-color);
            font-size: 0.9rem;
        }
        
        .badge-featured {
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 1;
        }
        
        footer {
            margin-top: auto;
            background-color: #343a40;
            color: white;
            padding: 2rem 0;
        }
        
        .cart-badge {
            position: absolute;
            top: -5px;
            right: -5px;
            font-size: 0.7rem;
    <style>
        body {
            background-color: #f8f9fa;
        }
        
        .sidebar {
            min-height: calc(100vh - 56px);
            background-color: #343a40;
        }
        
        .sidebar .nav-link {
            color: #fff;
            padding: 0.75rem 1rem;
        }
        
        .sidebar .nav-link:hover {
            background-color: #495057;
        }
        
        .sidebar .nav-link.active {
            background-color: #007bff;
        }
        
        .main-content {
            padding: 2rem;
        }
    </style>
</head>
<body>
    <?php include 'navigation.php'; ?>
    
    <?php 
    // Hiển thị flash message nếu có
    $flash = get_flash();
    if ($flash): 
    ?>
    <div class="container mt-3">
        <div class="alert alert-<?php echo e($flash['type']); ?> alert-dismissible fade show" role="alert">
            <?php echo e($flash['message']); ?>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    </div>
    <?php endif; ?>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="index.php">
                <i class="bi bi-speedometer2"></i> Admin Panel
            </a>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                            <i class="bi bi-person-circle"></i> <?php echo e($_SESSION['username']); ?>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item" href="../index.php" target="_blank">
                                <i class="bi bi-house"></i> Xem website
                            </a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="<?php echo base_url('index.php?page=logout'); ?>">
                                <i class="bi bi-box-arrow-right"></i> Đăng xuất
                            </a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar -->
            <nav class="col-md-2 d-md-block sidebar">
                <div class="position-sticky pt-3">
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'index.php' ? 'active' : ''; ?>" 
                               href="index.php">
                                <i class="bi bi-speedometer2"></i> Dashboard
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'products.php' ? 'active' : ''; ?>" 
                               href="products.php">
                                <i class="bi bi-laptop"></i> Sản phẩm
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'orders.php' ? 'active' : ''; ?>" 
                               href="orders.php">
                                <i class="bi bi-bag-check"></i> Đơn hàng
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'users.php' ? 'active' : ''; ?>" 
                               href="users.php">
                                <i class="bi bi-people"></i> Người dùng
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'categories.php' ? 'active' : ''; ?>" 
                               href="categories.php">
                                <i class="bi bi-grid-3x3"></i> Danh mục
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link <?php echo basename($_SERVER['PHP_SELF']) == 'brands.php' ? 'active' : ''; ?>" 
                               href="brands.php">
                                <i class="bi bi-tags"></i> Hãng
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <!-- Main Content -->
            <main class="col-md-10 ms-sm-auto main-content">
                <?php 
                $flash = get_flash();
                if ($flash): 
                ?>
                <div class="alert alert-<?php echo e($flash['type']); ?> alert-dismissible fade show" role="alert">
                    <?php echo e($flash['message']); ?>
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
                <?php endif; ?>

                <h1 class="h2 mb-4"><?php echo $page_title; ?></h1>
