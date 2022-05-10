import createDataContext from './createDataContext';
import mainApi from '../api/main_api';
import axios from 'axios';
import baseUrl from '../api/baseUrl';


const appReducer = (state, action) => {
    switch (action.type){
        case 'getAllBands':
            return {...state,
                    bands:action.payload.bands
                  }
        case 'getBand':
            return {...state,
                    band:action.payload.band
                    }
        case 'updateBand':
            return {...state,
                    band:action.payload.band,
                    bands:action.payload.bands
                    }
        default:
            return state;
    }
};

  const apiGetAllBands = (dispatch) => {
      return (callback) => {
        const headers = {
            "Content-Type" : "application/json",
        }
        mainApi.get('api/band', headers)
        .then(response => {
            let bands = [...response.data];
            dispatch({
                type: 'getAllBands',
                payload: {bands}
            })
            if(callback)
            {
                callback('Success',true)
            }
        }).catch(err => {
            console.error(err)
            if(callback)
            {
                callback(err?.response?.data,false)
            }
        })
      }
  }

  const apiGetBand = (dispatch) => {
    return (id,callback) => {
      const headers = {
          "Content-Type" : "application/json",
      }
      mainApi.get('api/band/'+id, headers)
      .then(response => {
          let band = {...response.data};
          dispatch({
              type: 'getBand',
              payload: {band}
          })
          if(callback)
          {
              callback('Success',true)
          }
      }).catch(err => {
          console.error(err)
          if(callback)
          {
              callback(err?.response?.data,false)
          }
      })
    }
}

  const apiCreateBand = (dispatch) => {
    return (band,bands,callback) => {
      const headers = {
          "Content-Type" : "application/json",
      }
      mainApi.post('api/band',band, headers)
      .then(response => {
          let newBands = [...bands,response.data];
          dispatch({
              type: 'getAllBands',
              payload: {bands:newBands}
          })
          if(callback)
          {
              callback('Success',true)
          }
      }).catch(err => {
          console.error(err)
          if(callback)
          {
              callback(err?.response?.data,false)
          }
      })
    }
}

const apiUpdateBand = (dispatch) => {
    return (band,callback) => {
      const headers = {
          "Content-Type" : "application/json",
      }
      mainApi.put('api/band/'+band._id,band, headers)
      .then(response => {
          let updatedBand = {...response.data.updatedBand};
          let newBands = [...response.data.bands];
          dispatch({
              type: 'updateBand',
              payload: {band:updatedBand,bands:newBands}
          })
          if(callback)
          {
              callback('Success',true)
          }
      }).catch(err => {
          console.error(err)
          if(callback)
          {
              callback(err?.response?.data,false)
          }
      })
    }
}

  const apiDeleteBand = (dispatch) => {
      return (band, bands, callback) => {
        const headers = {
            "Content-Type" : "application/json",
        }
        axios({
            method: 'DELETE',
            url: baseUrl+'api/band/'+band._id,
            headers: headers
          })
          .then((response) => {
            let newBands = bands.filter(el => el._id !== band._id);
            dispatch({
                type: 'getAllBands',
                payload: {bands:newBands}
            })
            if(callback)
            {
                callback(response.data,true)
            }
          })
          .catch((error) => {
            console.error(error)
            if(callback)
            {
                callback(error?.response?.data,false)
            }
            
          })
      }
  }


  export const { Context, Provider } = createDataContext(
    appReducer,
    {
        apiGetAllBands,
        apiDeleteBand,
        apiCreateBand,
        apiGetBand,
        apiUpdateBand
    },
    {
        bands: []
    }
);
