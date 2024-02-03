export default function About() {
  return (
    <div className='px-4 py-12 max-w-2xl mx-auto'>
      <h1 className='text-3xl font-bold  mb-4 text-slate-800 text-center'>
        About
      </h1>
      <p className='mb-4 text-slate-700'>
        This is a <span className="font-bold">MERN (MongoDB,
        Express, React, Node.js)</span> stack application with authentication. It
        <span className="font-bold"> allow users to sign up, log in, delete and log out</span>, and provides access to
        protected routes <span className="font-bold">only for authenticated users</span>.
      </p>
      <p className='mb-4 text-slate-700'>
        The front-end of the application is built with React and uses React
        Router for client-side routing. The back-end is built with Node.js and
        Express, and uses <span className="font-bold">MongoDB as the database.</span> Authentication is implemented
        using <span className="font-bold">JSON Web Tokens (JWT).</span>
        <span className="font-bold">Authentication with Google is made with Firebase</span> and google users are saved into MongoDB
        database. All users can change their profile images and these <span className="font-bold">images will be saved into FireBase.</span>
      </p>
      <p className='mb-4 text-slate-700'>
        This application is intended as a starting point for building full-stack
        web applications with authentication using the MERN stack.
      </p>
    </div>
  )
}
