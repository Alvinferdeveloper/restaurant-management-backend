import readline from 'readline';
import prisma from './lib/prisma'
import bcrypt from 'bcrypt';

async function promptSuperAdmin() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('¿Deseas crear un superadministrador? (s/n): ', async (answer) => {
    if (answer.toLowerCase() === 's') {
      const existing = await prisma.admin.findFirst({
        where: { roles: { some: { name: 'ADMIN' } } }
      });

      if (!existing) {
        const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
        const role = await prisma.role.findFirst({ where: { name: 'ADMIN' } });
        await prisma.admin.create({
          data: {
            name: process.env.ADMIN_NAME,
            email: process.env.ADMIN_EMAIL,
            password,
            roles: { connect: { id: role.id } },
            lastName: process.env.ADMIN_LASTNAME,
            cedula: process.env.ADMIN_CEDULA,
            gender: 'M',
            inss: process.env.ADMIN_INSS
          }
        });
        console.log('✅ Superadministrador creado.');
      } else {
        console.log('Ya existe un superadmin.');
      }
    }
    rl.close();
  });
}

promptSuperAdmin();