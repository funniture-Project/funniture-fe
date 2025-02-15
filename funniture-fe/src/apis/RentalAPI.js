
export async function getAdminRentalList() {
   

    return await fetch('http://localhost:8080/api/v1/rental').then(res => res.json());
}

