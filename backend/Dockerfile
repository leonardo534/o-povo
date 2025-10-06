FROM php:8.4-fpm

# Instala extensões do PHP necessárias para Laravel
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    unzip \
    zip \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip


RUN docker-php-ext-configure zip \
    && docker-php-ext-install zip \
    pdo pdo_mysql mysqli gd sockets
# Instala o Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Define diretório de trabalho
WORKDIR /var/www/html

# Copia arquivos do Laravel
COPY . . 

COPY .env.example .env

# Instala dependências do Laravel
RUN composer install --no-interaction --prefer-dist --optimize-autoloader
RUN php artisan key:generate 
RUN php artisan jwt:secret
# Ajusta permissões para o storage e bootstrap/cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 9000
CMD ["php-fpm"]