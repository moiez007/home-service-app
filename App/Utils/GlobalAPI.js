import { request, gql } from 'graphql-request'

const MASTER_URL = "https://api-ap-south-1.hygraph.com/v2/cls0h2q3v2bu801te12zm34o4/master"


const getSlider = async() => {

    const query = gql`
    query GetSlider {
        sliders {
          id
          image {
            url
          }
          name
        }
      }
      
  `
  const result = await request(MASTER_URL, query)
  return result

}

const getCategoies = async() => {
    const query = gql `
    query GetCategory {
        categories {
          id
          name
          icon {
            url
          }
        }
      }
      `
    const categories = await request(MASTER_URL, query)
    return categories
}


const getBusinessList = async() => {
    const query = gql`
    query getBusinessList {
        businessLists {
          id
          name
          email
          contactPerson
          category {
            name
          }
          address
          about
          images {
            url
          }
        }
      }
      `
      const businessList = await request(MASTER_URL, query)
      return businessList;
}

const getBusinessListByCategory = async(category)=>{
    const query = gql`
    query getBusinessList {
        businessLists(where: {category: {name: "`+category+`"}}) {
          id
          name
          email
          contactPerson
          category {
            name
          }
          address
          about
          images {
            url
          }
        }
      }
      `
      const businessList = await request(MASTER_URL, query)
      return businessList;
}

const createBooking = async(data)=>{
  const mutation_Query = gql `
  mutation createBooking {
    createBooking(
      data: {bookingStatus: Booked, 
        businessList: {connect: {id: "`+data.businessId+`"}}, 
        date: "`+data.date+`",
        time: "`+data.time+`", 
        userEmail: "`+data.userEmail+`", 
        userName: "`+data.userName+`"}
    ) {
      id
    }
    publishManyBookings(to: PUBLISHED) {
      count
    }
  }
  `
  const result = await request(MASTER_URL, mutation_Query)
  return result;
}

const getUserBooking = async (useremail) =>{
  const query = gql`
  query getUserBookings {
    bookings(orderBy: updatedAt_DESC, where: {userEmail: "`+useremail+`"}) {
      time
      userEmail
      userName
      bookingStatus
      date
      id
      businessList {
        id
        images {
          url
        }
        name
        address
        contactPerson
        email
        about
        category {
          name
        }
      }
    }
  }
  `
  const result = await request(MASTER_URL, query)
  return result;
}
export default {
    getSlider,
    getCategoies,
    getBusinessList,
    getBusinessListByCategory,
    createBooking,
    getUserBooking
}
