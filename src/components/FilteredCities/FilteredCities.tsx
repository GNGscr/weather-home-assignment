import { Link } from 'react-router-dom';
import type { City } from '../../types/City';
import { AnimatePresence, motion } from 'framer-motion';
import './FilteredCities.css';
import NotFoundMessage from '../NotFound';

type CitiesProps = {
    filteredCities: City[];
    searchParams: URLSearchParams;
};

const FilteredCities = ({ filteredCities, searchParams }: CitiesProps) => {
    
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const exitAnimation = {
    opacity: 0,
    scale: 0.7,
    transition: { duration: 0.3 },
  };

  if (filteredCities.length === 0) {
    return (
      <div className="centered-content">
        <NotFoundMessage message='No result found' />
      </div>
    );
  }
  
  return (
    <motion.div
        className='city-grid'
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        >
        <AnimatePresence>
            {filteredCities.map((city: City) => (
                <motion.div 
                    key={city.name}
                    className='city-card-wrapper'
                    variants={cardVariants}
                    exit={exitAnimation}
                    >
                    <motion.div
                    whileTap={{ scale: 0.95 }}
                    whileHover={{
                        scale: 1.03,
                        boxShadow: '0px 10px 20px rgba(0,0,0,0.2)',
                    }}
                    >
                      <Link
                          to={`/city/${encodeURIComponent(city.name)}?${searchParams.toString()}`}
                          className='city-card'
                          style={{ backgroundImage: `url(${city.image})` }}
                          aria-label={city.name}
                        >
                            <div className='city-card-content'>
                                <div className='card-header'>
                                    <p className='name'>{city.name}</p>
                                    <p className='country'>{city.country}</p>
                                </div>
                                <p>{city.description}</p>
                            </div>
                      </Link>
                    </motion.div>
                </motion.div>
            ))}
        </AnimatePresence>
    </motion.div>
  )
}

export default FilteredCities;