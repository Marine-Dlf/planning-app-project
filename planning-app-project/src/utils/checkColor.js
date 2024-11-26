
export function checkColor(typeName) {
    switch (typeName) {
        case "Concours":
            return "#88C4FF";
        case "Spectacle":
            return "#9AFF7F";
        case "Répétition":
            return "#FFF4A1"
        case "Réunion":
            return "#FFA3CC"
        case "Autre":
            return "rgb(254, 224, 228)"
        default:
    }
  }
