var Dashboard = {

  topTenCustomersWithMostOrders: function (client, callback) {
    const query = `
      SELECT
        customers.first_name AS first_name,
        customers.last_name AS last_name,
        customers.email AS email,
        COUNT(orders.id) AS number_of_orders
      FROM customers
      INNER JOIN orders
      ON customers.id = orders.customer_id
      GROUP BY
        customers.first_name,
        customers.last_name,
        customers.email
      ORDER BY COUNT(orders.id) DESC
      LIMIT 10
    `;
    client.query(query, (req, data) => {
      console.log(req);
      callback(data.rows);
    });
  },

  topTenCustomersWithHighestPayment: function (client, callback) {
    const query = `
   SELECT
     customers.first_name,
     customers.last_name,
     customers.email AS email,
     SUM(products.price * orders.quantity) AS total_payment
   FROM orders
   INNER JOIN products
   ON products.id = orders.product_id
   INNER JOIN customers
   ON customers.id = orders.customer_id
   GROUP BY
     customers.first_name,
     customers.last_name,
     customers.email
   ORDER BY
     total_payment DESC,
     customers.first_name ASC
   LIMIT 10
   `;
    client.query(query, (req, data) => {
      console.log(data.rows);
      callback(data.rows);
    });
  },
  topTenMostOrderedProducts: function (client, callback) {
    const query = `
      SELECT
        products.product_name AS product_name,
        COUNT(product_id) AS number_of_orders
      FROM orders
      INNER JOIN products
      ON products.id = orders.product_id
      GROUP BY
        product_id,
        products.product_name
      ORDER BY
        number_of_orders DESC,
        product_name ASC
      LIMIT 10
    `;
    client.query(query, (req, data) => {
      console.log(data.rows);
      callback(data.rows);
    });
  },
  topTenLeastOrderedProducts: function (client, callback) {
    const query = `
      SELECT
        products.product_name AS product_name,
        COUNT(product_id) AS number_of_orders
      FROM orders
      INNER JOIN products
      ON products.id = orders.product_id
      GROUP BY
        product_id,
        products.product_name
      ORDER BY
        number_of_orders ASC,
        product_name ASC
      LIMIT 10
    `;
    client.query(query, (req, data) => {
      console.log(data.rows);
      callback(data.rows);
    });
  },
  topThreeMostOrderedBrands: function (client, callback) {
    const query = `
     SELECT
       brands.name AS brand_name,
       COUNT(product_id) AS number_of_orders
     FROM orders
     INNER JOIN products
     ON products.id = orders.product_id
     INNER JOIN brands
     ON brands.id = products.brand_id
     GROUP BY
       brands.id
     ORDER BY
       number_of_orders DESC,
       brand_name ASC
     LIMIT 3
   `;
    client.query(query, (req, data) => {
      console.log(data.rows);
      callback(data.rows);
    });
  },
  topThreeMostOrderedCategories: function (client, callback) {
    // COUNT(product_id) AS number_of_orders
    const query = `
     SELECT DISTINCT
       products_category.name AS category_name,
       SUM(orders.quantity) AS number_of_orders
     FROM orders
     INNER JOIN products
     ON products.id = orders.product_id
     INNER JOIN products_category
     ON products_category.id = products.category_id
     GROUP BY
       products_category.id
     ORDER BY
       number_of_orders DESC,
       category_name ASC
     LIMIT 3
   `;
    client.query(query, (req, data) => {
      console.log(data.rows);
      callback(data.rows);
    });
  },
  totalSalesInTheLastSevenDays: function (client, callback) {
    const query = `
     SELECT SUM(orders.quantity*products.price) AS total_sales_for_seven_days
     FROM orders
     INNER JOIN products
     ON products.id = orders.product_id
     INNER JOIN customers
     ON customers.id = orders.customer_id
     WHERE order_date
     BETWEEN CURRENT_DATE - INTERVAL '7 days'
     AND CURRENT_DATE + INTERVAL '1 days'
   `;
    client.query(query, (req, data) => {
      console.log(data.rows);
      callback(data.rows);
    });
  }

};

module.exports = Dashboard;
