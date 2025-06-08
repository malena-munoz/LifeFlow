namespace lifeflow_api.Models.Objects
{
    public class StaticObjects
    {
        public static List<(int Id, string Label)> Emociones = new List<(int Id, string Label)>
        {
            (1, "Feliz"),
            (2, "Tranquila"),
            (3, "Empoderada"),
            (4, "Cariñosa"),
            (5, "Eufórica"),
            (6, "Indecisa"),
            (7, "Apática"),
            (8, "Cansada"),
            (9, "Ansiosa por comida"),
            (10, "Irritable"),
            (11, "Sensible"),
            (12, "Triste"),
            (13, "Ansiosa"),
            (14, "Enfadada"),
            (15, "Abrumada"),
            (16, "Aliviada"),
            (17, "Preocupada"),
            (18, "Confusa"),
            (19, "Deseo sexual alto"),
            (20, "Distante")
        };

        public static List<(int Id, string Label)> PartesCuerpo = new List<(int Id, string Label)>
        {
            (1, "Espalda"),
            (2, "Estómago"),
            (3, "Riñones"),
            (4, "Vejiga"),
            (5, "Aparato reproductor"),
            (6, "Cabeza"),
            (7, "Pecho")
        };

        public static List<(int Id, string Label)> Sintomas = new List<(int Id, string Label)>
        {
            (1, "Diarrea"),
            (2, "Náuseas"),
            (3, "Vómitos"),
            (4, "Fiebre"),
            (5, "Acné")
        };

        public static List<(int Id, string Label)> Fluido = new List<(int Id, string Label)>
        {
            (1, "Clara de huevo"),
            (2, "Acuoso"),
            (3, "Cremoso"),
            (4, "Pegajoso"),
            (5, "Seco"),
            (6, "Gelatinoso"),
            (7, "Maloliente"),
            (8, "Picante"),
            (9, "Cottage")
        };

    }
}
