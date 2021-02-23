import Link from "next/link"

const  Navbar = () =>  (
  <div>
    <ul>
      <li><Link href="/"><a>Home</a></Link></li> 
      <li><Link href="/podcast"><a>Podcast</a></Link></li> 
      <li><Link href="/about"><a>About</a></Link></li> 
    </ul>
    <style jsx>{`
      ul {
        color: #fff;
        list-style: none;
        display: flex;
      }
      ul  li {
        font-size: 18px;
        margin-right: 20px;
      }
      ul  li  a {
        color: #000000;
        text-decoration: none;
      } 
    `}</style>
  </div>
);
export default Navbar;