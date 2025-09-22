<script setup>
import { ref } from "vue";
import cinemaImg from "../assets/cinema.jpg"; 
import photo1 from "../assets/photo1.jpg";
import photo2 from "../assets/photo2.jpg";
import photo3 from "../assets/photo3.jpg";

const photos = [photo1, photo2, photo3];
const showGallery = ref(false);
const currentIndex = ref(0);

const openGallery = (index = 0) => {
  currentIndex.value = index;
  showGallery.value = true;
};
const closeGallery = () => showGallery.value = false;
const nextPhoto = () => currentIndex.value = (currentIndex.value + 1) % photos.length;
const prevPhoto = () => currentIndex.value = (currentIndex.value - 1 + photos.length) % photos.length;
</script>

<template>
  <!-- main picture -->
  <img :src="cinemaImg" alt="Cinema" style="width: 1500px; height: 300px; margin-left: 5px; margin-top: 50px;" />

  <!-- trailer -->
  <iframe 
    width="560" height="315" 
    src="https://www.youtube.com/embed/_8UxSWnj49U?si=2vk8Xt62xfxnWkdi" 
    title="YouTube video player" frameborder="0" allowfullscreen
    style="float: left; margin-left: 100px; margin-top: 150px;"
  ></iframe>

  <!-- gallery button -->
  <div style="float: left; margin-left: 350px; margin-top: 20px; clear: both;">
    <button @click="openGallery(0)"
      style="padding: 10px 20px; border: none; background:#FAC820; color: white; cursor: pointer; border-radius: 5px;">
      Gallery
    </button>
  </div>

  <!-- gallery -->
  <div v-if="showGallery" @click.self="closeGallery"
       style="position: fixed; top:0; left:0; width:100vw; height:100vh; background: rgba(0,0,0,0.8); display:flex; align-items:center; justify-content:center; z-index:1000;">
    <div style="position: relative; text-align: center;">
      <img :src="photos[currentIndex]" style="max-width:90vw; max-height:80vh;" />
      <button @click="closeGallery" style="position:absolute; top:10px; right:10px; background:red; color:white; border:none; padding:5px; border-radius:3px;">X</button>
      <button @click="prevPhoto" style="position:absolute; top:50%; left:-50px; transform:translateY(-50%); background:#FAC820; border:none; padding:10px;">‹</button>
      <button @click="nextPhoto" style="position:absolute; top:50%; right:-50px; transform:translateY(-50%); background:#FAC820; border:none; padding:10px;">›</button>
    </div>
  </div>

  <!-- film info -->
  <div style="font-family: Arial, sans-serif; line-height: 2.2; margin-left: 900px; margin-top:150px; max-width: 800px;">
    <h2>The Conjuring: Last Rites</h2>
    <h3>Kurja kutsumine 4. Viimased riitused</h3>
    <p><strong>Age Rating:</strong> K-12</p>
    <p><strong>Genre:</strong> Thriller, Horror</p>
    <p><strong>Director:</strong> Michael Chaves</p>
    <p><strong>Duration:</strong> 2h 16min</p>
    <p><strong>Cast:</strong> Vera Farmiga, Patrick Wilson, Madison Lawlor</p>
    <button style="margin-top: 15px; padding: 10px 20px; border: none; background:#FAC820; color: white; cursor: pointer; border-radius: 5px;">
      Choose Screening
    </button>
  </div>


<div style="display: flex; align-items: flex-start; margin-left: 50px; margin-top: 200px; gap: 50px;">
  <!-- text on the left -->
  <div style="max-width: 600px; font-family: Arial, sans-serif; line-height: 1.8;">
    <p>“Kurja kutsumise” universumi üheksas peatükk “Kurja kutsumine 4. Viimased riitused” on New Line Cinema film, mille lavastas filmisarja veteran Michael Chaves ja produtsendid on filmisarja loojad James Wan ja Peter Safran.</p>

    <p>“Kurja kutsumine 4. Viimased riitused” on ikoonilise “Kurja kutsumise” universumi järjekordne tõsielusündmustel põhinev peatükk. Vera Farmiga ja Patrick Wilson kehastavad globaalse hittsarja hirmuäratavas uusimas filmis viimast korda tuntud paranormaalsuste uurijaid Ed ja Lorraine Warrenit.</p>

    <p>Lisaks Farmigale ja Wilsonile saab filmis näha Mia Tomlinsoni ja Ben Hardyt vastavalt Edi ja Lorraine’i tütre Judy Warreni ja tema poiss-sõbra Tony Spera rollides. Steve Coulter kehastab taas isa Gordonit. Filmis mängivad veel Rebecca Calder, Elliot Cowan, Kíla Lord Cassidy, Beau Gadsdon, John Brotherton ja Shannon Kook.</p>

    <p>Filmi lavastas Chaves ja stsenaariumi autorid on Ian Goldberg, Richard Naing ja David Leslie Johnson-McGoldrick. Chad Hayesi ja Carey W. Hayesi loodud tegelaskujudel põhineva loo kirjutasid David Leslie Johnson-McGoldrick ja James Wan. Tegevprodutsendid on Michael Clear, Judson Scott, Natalia Safran, John Rickard, Hans Ritter ja David Leslie Johnson-McGoldrick.</p>

    <p>Chavese võttemeeskonna moodustasid operaator Eli Born, kunstnik John Frankish, monteerijad Elliot Greenberg ja Gregory Plotkin, visuaalefektide looja Scott Edelstein, visuaalefektide produtsent Eric Bruneau ja kostüümikunstnik Graham Churchyard. Näitlejad valisid Rose Wicksteed ja Sophie Kingston-Smith. Muusikaline juht oli Ian Broucek ja helilooja Benjamin Wallfisch.</p>

    <p>“Kurja kutsumine 4. Viimased riitused” on New Line Cinema, A Safran Company ja An Atomic Monster Productioni film, mida levitab üleilmselt Warner Bros. Pictures. Film linastub kinodes, ka IMAX-is, 5. septembrist 2025.</p>

    <p>Film linastub ka innovaatilises ICE kinosaalis.</p>
  </div>

  <!-- photo2 on the right -->
  <img :src="photo2" alt="Photo 2" style="width: 600px; height: 900px;" />
</div>
</template>