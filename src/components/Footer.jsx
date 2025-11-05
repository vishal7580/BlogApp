import { Link } from "react-router-dom"

const Footer = () => {
  const links = [
    {
    url: '#',
    page: 'About'
    },
    {
    url: '#',
    page: 'Contact'
    },
    {
    url: '#',
    page: 'Privacy'
    },
    {
    url: '#',
    page: 'Terms'
    },
  ]
  return (
    <footer className="bg-slate-600 text-white py-4 ">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left side - Brand / Text */}
        <p className=" mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>

        {/* Right side - Links */}
        <div className="flex space-x-6">
          {
            links.map(link => (
              <Link to={link.url} key={link.page} className=" hover:text-gray-300 ">{link.page}</Link>
            ))
          }

        </div>
      </div>
    </footer>
  )
}

export default Footer
