import Navbar from '../../components/Navbar';

export default function DashboardPage({ children }) {
    return (
      <>
        <div className='w-screen'>
          <Navbar />
          {children}
        </div>
      </>
    );
}