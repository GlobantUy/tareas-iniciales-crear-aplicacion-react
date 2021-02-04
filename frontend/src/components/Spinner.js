import React from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

    const LoadingSpinner = () => (
      <div>
          <FontAwesomeIcon icon={faSpinner} />
                  <center><h2>Cargando...</h2></center>
      </div>
    );

    export default LoadingSpinner;
    