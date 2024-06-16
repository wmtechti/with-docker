// pages/listall.js

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getServerSideProps() {
  let users = []
  try {
    console.log('Connecting...')
    users = await prisma.user.findMany()
    console.log(users)
  } catch (error) {
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }

  // Converting Date objects to strings
  users = users.map(user => ({
    ...user,
    emailVerified: user.emailVerified ? user.emailVerified.toISOString() : null,
  }))

  return {
    props: {
      users,
    },
  }
}

const ListAll = ({ users }) => {
  if (!users || users.length === 0) return <div>No users found.</div>

  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.email} - {user.emailVerified}</li>
        ))}
      </ul>
    </div>
  )
}

export default ListAll
