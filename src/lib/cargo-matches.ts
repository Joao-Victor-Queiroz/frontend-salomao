import { Cargo } from "@/features/auth";



export function doesCargoMatches(userCargo: Cargo, requiredCargo: Cargo[]){
    return requiredCargo.includes(userCargo);
}