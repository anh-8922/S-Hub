import ServiceRequestCard from "../../Components/ServiceReqestCard";
import useFetchData from "../../CustomHooks/useFetchData";
import Spinner from "../Spinner"

export default function Education () {
    const {data} = useFetchData('/servicerequests/listservicerequset')
    console.log("request data:", data)

    if (!data) {
        return <Spinner />;
      }


    const education = data.serviceRequestAds.filter((item) => item.category === "Education")
    console.log("educational req:", education)
    const handleRequestMessage = () => {

    }

    return(
        <div>
            {
                education.map((item) => {
                    const {_id, subject, location, createdAt, description} = item
                    const created = new Date (createdAt)
                    const year = created.getFullYear()
                    const month = created.getMonth() + 1
                    const day = created.getDate()

                    return(
                        <ServiceRequestCard handleMessage={handleRequestMessage}
                                            key={_id}
                                            _id={_id}
                                            subject={subject}
                                            location={location}
                                            description={description}
                                            createdAt = {`${year}-${month}-${day}`}/>
                    )
                })
            }
            
        </div>
    )
}


