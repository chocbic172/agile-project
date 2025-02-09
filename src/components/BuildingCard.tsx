import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { Building } from "../App"
import { Explore, LocationOn } from "@mui/icons-material"

interface BuildingCardProps {
    selectedBuilding : Building
    openXR : () => void
}

export const BuildingCard = ({ selectedBuilding, openXR } : BuildingCardProps) => {
    return (
        <Card sx={{ width: '100%' }}>
            <CardMedia
                component={ 'img' }
                alt={ 'Building Picture' }
                height={ 200 }
                image={
                    selectedBuilding.image_src ?
                    selectedBuilding.image_src :
                    'https://placehold.co/600x400'
                }
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {selectedBuilding.name}
                </Typography>
                <Typography variant={'body1'} sx={{ color: 'text.secondary' }}>
                    {selectedBuilding.isAccomodation ? '✅' : '❌'} Accommodation<br/>
                    {selectedBuilding.facilities.wheelchair_accessible ? '✅' : '❌'} Wheelchair Accessible
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size={'small'}
                    onClick={openXR}
                    startIcon={<Explore />}
                >
                    View in 3D
                </Button>
                <Button
                    size={'small'}
                    href={selectedBuilding.google_maps ? selectedBuilding.google_maps : '#'}
                    startIcon={<LocationOn />}
                >
                    Open in Google Maps
                </Button>
            </CardActions>
        </Card>
    )
}