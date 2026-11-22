---
title: "Learning PDO in PHP"
slug: {
	en: "learning-pdo-in-php",
	id: "belajar-pdo-di-php"
}
date: 2018-10-26
description: "Getting to know what PDO is and how to implement it"
keywords: "php, pdo, belajar php, belajar PDO, PDO di PHP"
tags: ["php", "pdo"]
image: "/media/default-banners/2.jpg"
---

### What is PDO?
> "***PDO - PHP Data Object*** *is a database access layer that provides a uniform method of access to multiple databases.*"

PDO (PHP Data Object) is a universal interface PHP provides to "talk" to a database server. "Universal interface" here means PDO isn't tied to one particular database application. If we use a MySQL database today and later want to migrate to PostgreSQL, we only need to change how PDO is first called, and all the existing program code can be used right away with the new database.

That's different from using the mysql extension or the mysqli extension. Both of those extensions only work with MySQL databases. That's why we should start moving to PDO instead of mysqli.

Technically, with the mysql or mysqli extension, PHP talks directly to the MySQL Server, but with PDO, it doesn't talk to the database directly; it only acts as an "interface". The PDO concept can be pictured like this:

![PDO accessing the Database through a DB Driver](https://www.phptutorial.net/wp-content/uploads/2021/04/php-pdo.svg)

PDO works with a method called a "data-access abstraction layer". That means whatever kind of database server we use, the PHP code we write stays the same. PDO provides an "abstraction layer" for talking to the database server.

To use PDO, we have to access it through an object. PDO doesn't offer a procedural style of writing like the mysqli or mysql extension. So before learning to use PDO, we need to understand *Object Oriented* programming terms like class, method, property and other OOP terms.

### Database Support
As of writing this article (PHP version 7.2), PDO supports at least 12 kinds of Interface/Database Server:

- PDO_CUBRID (Cubrid)
- PDO_DBLIB	(FreeTDS / Microsoft SQL Server / Sybase)
- PDO_FIREBIRD (Firebird)
- PDO_IBM	(IBM DB2)
- PDO_INFORMIX (IBM Informix Dynamic Server)
- PDO_MYSQL	(MySQL)
- PDO_OCI	(Oracle Call Interface)
- PDO_ODBC (ODBC)
- PDO_PGSQL	(PostgreSQL)
- PDO_SQLITE (SQLite 3 and SQLite 2)
- PDO_SQLSRV (Microsoft SQL Server / SQL Azure)
- PDO_4D (4D)

You can see this list in the [PHP Manual](http://php.net/manual/en/pdo.drivers.php).

We can see that PDO supports many popular database applications like Oracle, Microsoft SQL Server, and PostgreSQL. By writing our PHP code with PDO, we indirectly open up the possibility of using database servers other than MySQL, which makes it more flexible.

However, not all of these drivers are necessarily available on your system. Here's how to find out which drivers are installed on your system:

```php
<?php
  print_r(PDO::getAvailableDrivers());
?>
```

If the Database Driver you want isn't installed on your system yet, you have to install it first.

### Creating a Connection with PDO
Different databases have slightly different connection methods. Below are examples of a few methods for connecting to a database.

```php
<?php
  try {
    # MS SQL Server
    $dbh = new PDO("sqlsrv:server={$host};database={$dbname}", $user, $pass);

    # MySQL
    $dbh = new PDO("mysql:host={$host};dbname={$dbname}", $user, $pass);

    # SQLite
    $dbh = new PDO("sqlite:path/database/database.db");

    # Show the error message if an exception occurs while accessing the Database.
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }
  catch(PDOException $e) {
    die($e->getMessage());
  }
?>
```

You should always wrap PDO operations in a **try - catch** block, and use the exception mechanism to show errors when something goes wrong accessing the database. [Learn more about PDO Exception](http://php.net/manual/en/class.pdoexception.php)

The **`$dbh`** variable is the variable that becomes the PDO object. This object is usually called the *"Database Handler"*. It's the object we'll use later to run PDO commands. The variable name can be anything; it doesn't have to be **`$dbh`**.

The PDO constructor takes 3 arguments. The first contains the database server name (for example: **mysql**) followed by the server address and the database name, all in 1 string. The second argument is the user name, and the third is the user's password.

After creating a PDO connection, to remove the connection we just assign *"null"* to the *"Database Handler"* variable like this:

```php
<?php
  $dbh = null;
?>
```

We should always close / remove the Database connection every time we're done running a query.

### Closing
That's where I'll close this article; maybe next time I'll post about **Database CRUD with PDO**. And I hope readers start migrating from the mysqli Extension to PDO soon to make your projects more productive.

### References
- [code.tutsplus.com](https://code.tutsplus.com/id/tutorials/why-you-should-be-using-phps-pdo-for-database-access--net-12059)
- [duniailkom.com](https://www.duniailkom.com/tutorial-php-mysql-pengertian-pdo-dan-cara-mengaktifkan-pdo-php-data-objects/)
