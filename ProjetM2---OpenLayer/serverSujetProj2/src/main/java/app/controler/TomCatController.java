package app.controler;

import app.dao.*;
import app.modele.*;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import javax.imageio.ImageIO;
import javax.validation.Valid;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("")
public class TomCatController {

    @Autowired
    private ImageRepository imRepository;

    @Autowired
    private DegradationArbreRepository degradationArbreRepository;

    @Autowired
    private DegradationBancRepository degradationBancRepository;
    @Autowired
    private DegradationDechetRepository degradationDechetRepository;
    @Autowired
    private DegradationPoubelleRepository degradationPoubelleRepository;
    @Autowired
    private DegradationToiletteRepository degradationToiletteRepository;

    public String pathData="src/main/resources/img/";


    @RequestMapping(value = "degradationArb", method = RequestMethod.POST)
    public DegradationArbre addDegradationdArb(@Valid @RequestBody DegradationArbre da){
        DegradationArbre degA = new DegradationArbre();
        //System.out.println("ttettet:"+da.getIdArbreFK());
        degA.setIdArbreFK(da.getIdArbreFK());
        degA.setDescription(da.getDescription());
        degradationArbreRepository.save(degA);
        return degA;
    }

    @RequestMapping(value = "degradationArb", method = RequestMethod.GET)
    public List<DegradationArbre> getAllDegradationArb(){
        List<DegradationArbre> lDegArb = degradationArbreRepository.findAll();
        return lDegArb;
    }

    @RequestMapping(value = "degradationArb/{id}", method = RequestMethod.GET)
    public DegradationArbre getDegradationArb(@PathVariable Long idDegArb){
        DegradationArbre da = degradationArbreRepository.findById(idDegArb).
                orElseThrow(() -> new ResourceNotFoundException("User not found on :: " + idDegArb));
        return da;
    }


    @RequestMapping(value = "degradationBanc", method = RequestMethod.POST)
    public DegradationBanc postDegBanc(@Valid @RequestBody DegradationBanc db){
        System.out.println("TestDEG");
        DegradationBanc DegB = new DegradationBanc();
        DegB.setIdBancFk(db.getIdBancFk());
        DegB.setDescription(db.getDescription());
        degradationBancRepository.save(DegB);
        return DegB;
    }

    @RequestMapping(value = "degradationBanc",method = RequestMethod.GET)
    public List<DegradationBanc> getAllDegradationBanc(){
        System.out.println("TestGETDEG");
        List<DegradationBanc> lDegBanc = degradationBancRepository.findAll();
        return lDegBanc;
    }

    @RequestMapping(value = "degradationBanc/{id}",method = RequestMethod.GET)
    public DegradationBanc getDegradationBanc(@PathVariable Long idDegBanc){
        DegradationBanc db = degradationBancRepository.findById(idDegBanc).
                orElseThrow(() -> new ResourceNotFoundException("User not found on :: " + idDegBanc));
        return db;
    }

    @RequestMapping(value = "degradationDec",method = RequestMethod.POST)
    public DegradationDechet postDegDec(@Valid @RequestBody DegradationDechet dd){
        DegradationDechet DegD = new DegradationDechet();
        DegD.setIdDecFk(dd.getIdDecFk());
        DegD.setDescription(dd.getDescription());
        degradationDechetRepository.save(DegD);
        return DegD;
    }

    @RequestMapping(value = "degradationDec", method = RequestMethod.GET)
    public List<DegradationDechet> getAllDegradationDechet(){
        List<DegradationDechet> lDegDec = degradationDechetRepository.findAll();
        return lDegDec;
    }

    @RequestMapping(value = "degradationDec/{id}",method = RequestMethod.GET)
    public DegradationDechet getDegradationDechet(@PathVariable Long idDegDec){
        DegradationDechet dd = degradationDechetRepository.findById(idDegDec).
                orElseThrow(() -> new ResourceNotFoundException("User not found on :: " + idDegDec));
        return dd;
    }

    @RequestMapping(value = "degradationPou",method = RequestMethod.POST)
    public DegradationPoubelle postDegPou(@Valid @RequestBody DegradationPoubelle dp){
        DegradationPoubelle DegP = new DegradationPoubelle();
        DegP.setIdPouFk(dp.getIdPouFk());
        DegP.setDescription(dp.getDescription());
        degradationPoubelleRepository.save(DegP);
        return DegP;
    }

    @RequestMapping(value = "degradationPou",method = RequestMethod.GET)
    public List<DegradationPoubelle> getAllDegradationPoubelle(){
        List<DegradationPoubelle> lDegPou = degradationPoubelleRepository.findAll();
        return lDegPou;
    }

    @RequestMapping(value = "degradationPou/{id}",method = RequestMethod.GET)
    public DegradationPoubelle getDegradationPoubelle(@PathVariable Long idDegPou){
        DegradationPoubelle dp = degradationPoubelleRepository.findById(idDegPou).
                orElseThrow(() -> new ResourceNotFoundException("User not found on :: " + idDegPou));
        return dp;
    }

    @RequestMapping(value = "degradationToi",method = RequestMethod.POST)
    public DegradationToilette addDegradationToilette(@Valid @RequestBody DegradationToilette dt){
        DegradationToilette DegT = new DegradationToilette();
        DegT.setIdToiFk(dt.getIdToiFk());
        DegT.setDescription(dt.getDescription());
        degradationToiletteRepository.save(DegT);
        return DegT;
    }

    @RequestMapping(value = "degradationToi",method = RequestMethod.GET)
    public List<DegradationToilette> getAllDegradationToillette(){
        List<DegradationToilette> lDegToi = degradationToiletteRepository.findAll();
        return lDegToi;
    }

    @RequestMapping(value = "degradationToi/{id}",method = RequestMethod.GET)
    public DegradationToilette getDegradationToilette(@PathVariable Long idDegToi){
        DegradationToilette dt = degradationToiletteRepository.findById(idDegToi).
                orElseThrow(() -> new ResourceNotFoundException("User not found on :: " + idDegToi));
        return dt;
    }

    @RequestMapping(value = "image", method = RequestMethod.GET)
    public List<ImageArbre> getAllImages()
    {
        System.out.println("getAllImages");



        List <ImageArbre> lia=imRepository.findAll();
        for(ImageArbre ia: lia){

            String enc=encodeIm(pathData,ia.idImgA,ia.nameImgA);
            if(enc!=null){

                ia.dataImgA = enc;
            }else{
                System.out.println("no file exist yet");
            }


        }
        return lia;
        //return imRepository.findAll();
    }

    private static byte[] convertFileToByteArray(File file){
        FileInputStream fis = null;
        // Creating bytearray of same length as file
        byte[] bArray = new byte[(int) file.length()];
        try{
            fis = new FileInputStream(file);
            // Reading file content to byte array
            fis.read(bArray);
            fis.close();

        }catch(IOException ioExp){
            ioExp.printStackTrace();
        }finally{
            if(fis != null){
                try {
                    fis.close();
                } catch (IOException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            }
        }
        return bArray;
    }

    @RequestMapping(value = "image/{id}", method = RequestMethod.GET)
    public ImageArbre getImage(@PathVariable(value = "id") Long imageArbreId)
    {
        System.out.println("getAllImages");
        ImageArbre ia=imRepository.findById(imageArbreId).
                orElseThrow(() -> new ResourceNotFoundException("User not found on :: " + imageArbreId));

        String enc=encodeIm(pathData,ia.idImgA,ia.nameImgA);
        if(enc!=null){

            ia.dataImgA = enc;
        }else{
            System.out.println("no file exist yet");
        }

        return ia;
    }

    @RequestMapping(value = "imageTest", method = RequestMethod.GET)
    public List<ImageArbre> getPostTest()
    {
        System.out.println("getPostTest");
        // HttpHeaders headers = new HttpHeaders();

        ImageArbre ia=new ImageArbre();
        ia.setNameImgA("Image1");


        //Handle other types if necessary

        // headers.add("image","image1");

        imRepository.save(ia);

        return imRepository.findAll();
    }

    @RequestMapping(value = "image", method = RequestMethod.POST)
    public ImageArbre createImage(@Valid @RequestBody ImageArbre ia)
    {
        System.out.println("createImage");
        // HttpHeaders headers = new HttpHeaders();
        System.out.println(ia.dataImgA);

        //CreateImage(ia.dataImgA.split(",")[1].getBytes(Charset.forName("UTF-8")));
        //CreateImage(new byte[0]);  //waiting

        String imageString=ia.dataImgA;
        ia.dataImgA="";
        ImageArbre iarbre= imRepository.save(ia);

        DecodeIm(imageString,ia.nameImgA,iarbre.idImgA);



        return iarbre;
    }

    @RequestMapping(value = "imageDelete/{id}", method = RequestMethod.DELETE)
    public Long deleteImage(@PathVariable(value = "id") Long imageArbreId) throws Exception
    {
        System.out.println("deleteImage");
        // HttpHeaders headers = new HttpHeaders();

        ImageArbre ia =
                imRepository
                        .findById(imageArbreId)
                        .orElseThrow(() -> new ResourceNotFoundException("User not found on :: " + imageArbreId));



        return imageArbreId;
    }

    @RequestMapping(value = "imageUpdate/{id}/{name}/{longitude}/{latitude}", method = RequestMethod.DELETE)
    public Long updateImage(@PathVariable(value = "id") Long imageArbreId,@PathVariable(value = "name") String name, @PathVariable(value = "longitude") Float longitude,@PathVariable(value = "latitude") Float latitude) throws Exception
    {
        System.out.println("updateImage");
        // HttpHeaders headers = new HttpHeaders();

        ImageArbre ia =
                imRepository
                        .findById(imageArbreId)
                        .orElseThrow(() -> new ResourceNotFoundException("User not found on :: " + imageArbreId));

        ia.idImgA = imageArbreId;
        ia.longitude = longitude;
        ia.latitude = latitude;
        ia.nameImgA = name;

        imRepository.save(ia);

        return imageArbreId;
    }

    /*public void CreateImage(byte [] data){
        try{
            BufferedImage bImage = ImageIO.read(new File("sample.jpg"));
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            ImageIO.write(bImage, "jpg", bos );
            byte [] data = bos.toByteArray();
            ByteArrayInputStream bis = new ByteArrayInputStream(data);
            BufferedImage bImage2 = ImageIO.read(bis);
            ImageIO.write(bImage2, "jpg", new File("output.jpg") );
            System.out.println("image created");
        }catch (Exception e){
            e.printStackTrace();
        }

    }*/

    public void DecodeIm(String sourceData,String name,Long id){

        try{
            Path p=Paths.get(pathData+id+"_"+name);
            if(!Files.exists(p)){
                // tokenize the data
                String[] parts = sourceData.split(",");
                String imageString = parts[1];

                parts=parts[0].split("/");
                parts=parts[1].split(";");
                String extension=parts[0];

// create a buffered image
                BufferedImage image = null;
                byte[] imageByte;

                BASE64Decoder decoder = new BASE64Decoder();
                imageByte = decoder.decodeBuffer(imageString);
                ByteArrayInputStream bis = new ByteArrayInputStream(imageByte);
                image = ImageIO.read(bis);
                bis.close();

// write the image to a file
                File outputfile = new File(pathData+id+"_"+name);
                String[] tab= name.split("\\.");

                ImageIO.write(image, tab[1], outputfile);

                System.out.println("createddddd");
            }else{
                System.out.println("already   createddddd");
            }



        }catch(Exception e){
           e.printStackTrace();
        }
    }

    public String encodeIm(String pathData,Long idImgA,String nameImgA){
        try{
            String url=pathData+idImgA+"_"+nameImgA;

            Path path= Paths.get(url);


            if(Files.exists(path)) {
                System.out.println("file exist");
                System.out.println(url);
                byte[] fileContent = Files.readAllBytes(path);
                String encodedString = Base64.getEncoder().encodeToString(fileContent);
                StringBuilder sb = new StringBuilder();
                sb.append("data:");
                String[] tab = nameImgA.split("\\.");
                sb.append("image/" + tab[1]);
                sb.append(";base64,");
                sb.append(encodedString);
                System.out.println(sb.toString());
                return sb.toString();
            }

        }catch (Exception e){
            e.printStackTrace();

        }

        return null;
    }







}









