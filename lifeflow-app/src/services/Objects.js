import { ReactComponent as SpineIcon } from 'healthicons/public/icons/svg/filled/body/spine.svg';
import { ReactComponent as StomachIcon } from 'healthicons/public/icons/svg/filled/body/stomach.svg';
import { ReactComponent as KidneysIcon } from 'healthicons/public/icons/svg/filled/body/kidneys.svg';
import { ReactComponent as BladderIcon } from 'healthicons/public/icons/svg/filled/body/bladder.svg';
import { ReactComponent as UterusIcon } from 'healthicons/public/icons/svg/filled/body/female_reproductive_system.svg';
import { ReactComponent as HeadIcon } from 'healthicons/public/icons/svg/filled/body/head.svg';
import { ReactComponent as BreastIcon } from 'healthicons/public/icons/svg/filled/people/lactation.svg';
import { ReactComponent as DiarrheaIcon } from 'healthicons/public/icons/svg/filled/conditions/diarrhea.svg';
import { ReactComponent as NauseasIcon } from 'healthicons/public/icons/svg/filled/conditions/nausea.svg';
import { ReactComponent as VomitIcon } from 'healthicons/public/icons/svg/filled/conditions/vomiting.svg';
import { ReactComponent as FeverIcon } from 'healthicons/public/icons/svg/filled/conditions/chills_fever.svg';
import { VolcanoOutlined } from '@mui/icons-material/';

export function Emotions() {
    return [
        { id: 1, icon: 'fi fi-rr-smile', label: 'Feliz' },
        { id: 2, icon: 'fi fi-rr-meditation', label: 'Tranquila' },
        { id: 3, icon: 'fi fi-rr-heart-health-muscle', label: 'Empoderada' },
        { id: 4, icon: 'fi fi-rr-grin-hearts', label: 'Cariñosa' },
        { id: 5, icon: 'fi fi-rr-grin-beam', label: 'Eufórica' },
        { id: 6, icon: 'fi fi-rr-face-thinking', label: 'Indecisa' },
        { id: 7, icon: 'fi fi-rr-meh', label: 'Apática' },
        { id: 8, icon: 'fi fi-rr-face-sleeping', label: 'Cansada' },
        { id: 9, icon: 'fi fi-rr-hamburger', label: 'Ansiosa por comida' },
        { id: 10, icon: 'fi fi-rr-angry', label: 'Irritable' },
        { id: 11, icon: 'fi fi-rr-sad-cry', label: 'Sensible' },
        { id: 12, icon: 'fi fi-rr-sad', label: 'Triste' },
        { id: 13, icon: 'fi fi-rr-face-anxious-sweat', label: 'Ansiosa' },
        { id: 14, icon: 'fi fi-rr-angry', label: 'Enfadada' },
        { id: 15, icon: 'fi fi-rr-face-confounded', label: 'Abrumada' },
        { id: 16, icon: 'fi fi-rr-face-relieved', label: 'Aliviada' },
        { id: 17, icon: 'fi fi-rr-face-worried', label: 'Preocupada' },
        { id: 18, icon: 'fi fi-rr-dizzy', label: 'Confusa' },
        { id: 19, icon: 'fi fi-rr-fire-flame-curved', label: 'Deseo sexual alto' },
        { id: 20, icon: 'fi fi-rr-snowflake', label: 'Distante' },
    ];
}

export function BodyParts() {
    return [
        { id: 1, icon: SpineIcon, label: 'Espalda' },
        { id: 2, icon: StomachIcon, label: 'Estómago' },
        { id: 3, icon: KidneysIcon, label: 'Riñones' },
        { id: 4, icon: BladderIcon, label: 'Vejiga' },
        { id: 5, icon: UterusIcon, label: 'Aparato reproductor' },
        { id: 6, icon: HeadIcon, label: 'Cabeza' },
        { id: 7, icon: BreastIcon, label: 'Pecho' }
    ];
}

export function Symptoms() {
    return [
        { id: 1, icon: DiarrheaIcon, label: 'Diarrea' },
        { id: 2, icon: NauseasIcon, label: 'Náuseas' },
        { id: 3, icon: VomitIcon, label: 'Vómitos' },
        { id: 4, icon: FeverIcon, label: 'Fiebre' },
        { id: 5, icon: VolcanoOutlined, label: 'Acné' },
    ];
}

export function FemFluid() {
    return [
        { id: 1, icon: 'fi fi-rr-egg-fried', label: 'Clara de huevo' },
        { id: 2, icon: 'fi fi-rr-raindrops', label: 'Acuoso' },
        { id: 3, icon: 'fi fi-rr-cream', label: 'Cremoso' },
        { id: 4, icon: 'fi fi-rr-honey-pot', label: 'Pegajoso' },
        { id: 5, icon: 'fi fi-rr-cactus', label: 'Seco' },
        { id: 6, icon: 'fi fi-rr-custard', label: 'Gelatinoso' },
        { id: 7, icon: 'fi fi-rr-wind-warning', label: 'Maloliente' },
        { id: 8, icon: 'fi fi-rr-pepper-hot', label: 'Picante' },
        { id: 9, icon: 'fi fi-rr-cheese', label: 'Cottage' }
    ];
}

export function GooogleColors() {
    return [
        { value: 8, color: '#e1e1e1', label: 'Naranja melón' },
        { value: 10, color: '#51b749', label: 'Verde musgo'},
        { value: 1, color: '#a4bdfc', label: 'Azul claro' },
        { value: 9, color: '#5484ed', label: 'Azul arándano' },
        { value: 2, color: '#7ae7bf', label: 'Azul turquesa' },
        { value: 7, color: '#46d6db', label: 'Turquesa' },
        { value: 3, color: '#dbadff', label: 'Lavanda' },   
        { value: 5, color: '#fbd75b', label: 'Amarillo huevo' },
        { value: 6, color: '#ffb878', label: 'Mandarina' },
        { value: 4, color: '#ff887c', label: 'Rosa chicle'},
        { value: 11, color: '#dc2127', label: 'Tomate' }
    ];
}

export function Filter1Recurrency() {
    return [
        { label: 'Diariamente', value: 'DAILY' },
        { label: 'Semanalmente', value: 'WEEKLY' },
        { label: 'Mensualmente', value: 'MONTHLY' },
    ];
}

export function Filter2Recurrency() {
    return [
        { label: 'Lunes', value: 'MO' },
        { label: 'Martes', value: 'TU' },
        { label: 'Miércoles', value: 'WE' },
        { label: 'Jueves', value: 'TH' },
        { label: 'Viernes', value: 'FR' },
        { label: 'Sábado', value: 'SA' },
        { label: 'Domingo', value: 'SU' },
    ];
}