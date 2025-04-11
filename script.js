document.addEventListener("DOMContentLoaded", function () {
  const feedbackForm = document.getElementById("feedback-form");

  // Vérifier que l'élément existe dans le DOM
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Récupération de la note sélectionnée
      const ratingInput = document.querySelector(
        'input[name="rating"]:checked'
      );
      const rating = ratingInput ? parseInt(ratingInput.value) : 0;

      // Récupération du commentaire
      const commentInput = document.querySelector('textarea[name="message"]');
      const comment = commentInput ? commentInput.value : "";

      const messageBox = document.getElementById("response-message");

      // Vérifier qu'une note a bien été sélectionnée
      if (!rating) {
        alert("Veuillez sélectionner une note.");
        return;
      }

      messageBox.classList.remove("hidden");

      if (rating <= 3) {
        // Cas d'un avis négatif (3 étoiles ou moins)
        messageBox.style.color = "orangered";
        messageBox.innerHTML =
          "😔 Nous sommes désolés pour cette expérience. Votre message sera transmis au professionnel de santé.";

        // Création d'un formulaire temporaire pour soumettre les données via FormSubmit
        const tempForm = document.createElement("form");
        tempForm.action = "https://formsubmit.co/leraincy.2005@gmail.com"; // Remplacez par votre adresse email
        tempForm.method = "POST";

        const fields = {
          rating: rating,
          comment: comment,
          _subject: "Avis patient (3 étoiles ou moins)",
          _captcha: "false"
        };

        // Ajout de chaque champ comme input caché dans le formulaire temporaire
        Object.keys(fields).forEach(function (key) {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = fields[key];
          tempForm.appendChild(input);
        });

        document.body.appendChild(tempForm);
        tempForm.submit();
      } else {
        // Cas d'un avis positif (plus de 3 étoiles)
        messageBox.style.color = "green";
        messageBox.innerHTML =
          "✅ Merci pour votre avis positif ! Redirection vers Google...";

        setTimeout(() => {
          // Remplacez l'URL ci-dessous par l'URL exacte de votre page Google Business d'avis
          window.location.href =
            "https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID";
        }, 2000);
      }
    });
  } else {
    console.error(
      "L'élément avec l'ID 'feedback-form' n'a pas été trouvé dans le DOM."
    );
  }
});