// naturapp-backend/seed.js
import mongoose from 'mongoose';
import Product from './models/Product.js';
import Category from './models/Category.js';

// Conectar a la base de datos local
mongoose.connect('mongodb://localhost:27017/naturapp')
  .then(() => console.log('MongoDB conectado para poblar datos...'))
  .catch(err => console.error('Error de conexión:', err));

const seedDatabase = async () => {
  try {
    // 1. Limpiar la base de datos actual para evitar duplicados
    await Product.deleteMany({});
    await Category.deleteMany({});
    console.log('Colecciones limpiadas.');

    // 2. Crear las Categorías
    const categorias = await Category.insertMany([
      { name: 'Superalimentos', description: 'Nutrición ancestral andina', icon: 'nutrition' },
      { name: 'Infusiones', description: 'Hierbas y tés naturales', icon: 'cafe' },
      { name: 'Suplementos', description: 'Para tu bienestar diario', icon: 'fitness' },
      { name: 'Cuidado Personal', description: 'Cosmética y piel natural', icon: 'flower' }
    ]);
    console.log('Categorías creadas.');

    // Extraer los IDs reales que MongoDB les asignó
    const idSuperalimentos = categorias.find(c => c.name === 'Superalimentos')._id;
    const idInfusiones = categorias.find(c => c.name === 'Infusiones')._id;
    const idSuplementos = categorias.find(c => c.name === 'Suplementos')._id;

    // 3. Crear Productos inspirados en Santa Natura
    await Product.insertMany([
      {
        name: 'Maca Gelatinizada Premium',
        description: 'Maca andina 100% pura. Aumenta la energía, el rendimiento y la resistencia física y mental.',
        price: 45.50,
        category: idSuperalimentos,
        image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=80',
        stock: 50,
        tags: ['maca', 'energia', 'andino'],
        nutritionalInfo: { calories: 320, protein: '14g', fiber: '8g' }
      },
      {
        name: 'Té Filtrante de Uña de Gato',
        description: 'Poderoso desinflamante y refuerzo natural para el sistema inmunológico.',
        price: 25.00,
        category: idInfusiones,
        image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=400&q=80',
        stock: 100,
        tags: ['inmunidad', 'hierbas', 'salud'],
        nutritionalInfo: { calories: 0, protein: '0g', fiber: '0g' }
      },
      {
        name: 'Colágeno Hidrolizado + Vitamina C',
        description: 'Fortalece articulaciones, mejora la elasticidad de la piel, cabello y uñas con alta absorción.',
        price: 89.90,
        category: idSuplementos,
        image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=400&q=80',
        stock: 30,
        tags: ['colageno', 'articulaciones', 'belleza'],
        nutritionalInfo: { calories: 40, protein: '10g', fiber: '0g' }
      },
      {
        name: 'Harina de Tocosh',
        description: 'Conocida como la penicilina natural de los Andes. Excelente protector gástrico y regenerador de flora intestinal.',
        price: 35.00,
        category: idSuperalimentos,
        image: 'https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=400&q=80',
        stock: 20,
        tags: ['tocosh', 'estomago', 'andino'],
        nutritionalInfo: { calories: 350, protein: '5g', fiber: '12g' }
      }
    ]);
    console.log('¡Productos de NaturApp creados exitosamente!');
    
    // Cerrar la conexión
    process.exit();
  } catch (error) {
    console.error('Error al poblar la base de datos:', error);
    process.exit(1);
  }
};

seedDatabase();