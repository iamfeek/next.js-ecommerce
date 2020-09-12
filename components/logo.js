import Link from 'next/link';
import {config} from '../config/config';

export default function Logo() {
  return (
    <>
      <Link href="/">
        <a className="logo">{config.HEADER_TITLE}</a>
      </Link>
      <style jsx>{`
        .logo {
          font-style: normal;
          font-weight: 900;
          font-size: 22px;
          line-height: 60px;
          letter-spacing: 1.65px;
          text-transform: uppercase;
          color: #4d4d4d;
          text-decoration: none;
        }
      `}</style>
    </>
  );
}
