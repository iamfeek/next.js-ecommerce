import {connection} from '../db/connection';

export async function listProducts({ sort, category }) {
  if (sort && category) {
    // Sort + Category
    const sortParsed = JSON.parse(JSON.stringify(sort[0]));
    const { field, order } = sortParsed;

    return connection('product')
      .join(
        'product_category',
        'product.id',
        '=',
        'product_category.product_id'
      )
      .join('category', 'category.id', '=', 'product_category.category_id')
      .where('category.name', category)
      .select('product.*')
      .orderBy(field, order);
  } else if (sort) {
    // Sort
    const sortParsed = JSON.parse(JSON.stringify(sort[0]));
    const { field, order } = sortParsed;

    return connection('product').orderBy(field, order);
  } else if (category) {
    // Category
    return connection('product')
      .join(
        'product_category',
        'product.id',
        '=',
        'product_category.product_id'
      )
      .join('category', 'category.id', '=', 'product_category.category_id')
      .where('category.name', category)
      .select('product.*');
  }

  // Default
  return connection('product');
}

export async function findProduct({ id }) {
  return connection('product').whereRaw('id = ?', [id]).first();
}

export async function findProductsById({ id }) {
  if (id) {
    return connection('product').where((builder) =>
      builder.whereIn('id', id)
    );
  }
}

export async function CreateProduct(input) {
  const newProduct = {
    name: input.name,
    description: input.description,
    img_url: input.img_url,
    price: parseFloat(input.price),
    rating: parseFloat(input.rating),
    created_at: new Date(),
    updated_at: new Date(),
    user_id: '1',
  };

  const trx = await connection.transaction();
  try {
    const insertedProductId = await trx('product').insert(newProduct);
    const product_id = insertedProductId[0];

    await trx('product_category').insert({
      product_id,
      category_id: input.category_id,
    });

    await trx.commit();

    return findProduct({ id: product_id });
  } catch (error) {
    await trx.rollback();

    throw new Error('Server side error to create a new product');
  }
}

export async function DeleteProduct({ id }) {
  await connection('product').whereRaw('id = ?', [id]).del();

  return true;
}

export async function UpdateProduct(id, input) {
  const newProduct = {
    name: input.name,
    description: input.description,
    img_url: input.img_url,
    price: parseFloat(input.price),
    rating: parseFloat(input.rating),
    updated_at: new Date(),
  };
  const updatedProduct = await connection('product')
    .whereRaw('id = ?', [id])
    .update(newProduct);

  return findProduct({id: updatedProduct});
}
