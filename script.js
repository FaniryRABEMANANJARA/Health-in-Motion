$(document).ready(function() {
    // Fonction pour initialiser le tableau des activités (DataTables)
    function initialiserTableauActivites() {
        $('#tableauActivites').DataTable({
            "ajax": {
                "url": "../data/donnees_activites.json",
                "dataType": "json" // Spécifier le type de données attendu
            },
            "columns": [{
                "data": "date"
            }, {
                "data": "activite"
            }, {
                "data": "duree"
            }, {
                "data": "calories"
            }],
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.11.5/i18n/fr-FR.json"
            },
            "responsive": true,
            "scrollX": true
        });
    }

    // Fonction pour afficher les conseils nutritionnels
    function afficherConseilsNutrition() {
        $.ajax({
            url: "../data/donnees_nutrition.json",
            dataType: "json", // Spécifier le type de données attendu
            success: function(data) {
                let conseilsHTML = '<ul>';
                $.each(data, function(index, conseil) {
                    conseilsHTML += '<li>' + conseil.tip + '</li>';
                });
                conseilsHTML += '</ul>';
                $('#conseilsNutrition').html(conseilsHTML);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Erreur lors du chargement des données nutritionnelles:", textStatus, errorThrown);
                $('#conseilsNutrition').html("<p>Erreur lors du chargement des conseils nutritionnels.</p>"); // Afficher un message d'erreur en cas d'échec
            }
        });
    }

    // Fonction pour afficher les informations du profil
    function afficherInfosProfil() {
        $.ajax({
            url: "../data/donnees_profil.json",
            dataType: "json", // Spécifier le type de données attendu
            success: function(data) {
                let profilHTML = '<dl>';
                $.each(data, function(key, value) {
                    profilHTML += '<dt>' + key.charAt(0).toUpperCase() + key.slice(1) + '</dt>'; // Clé avec première lettre en majuscule
                    profilHTML += '<dd>' + value + '</dd>';
                });
                profilHTML += '</dl>';
                $('#infosProfil').html(profilHTML);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Erreur lors du chargement des données du profil:", textStatus, errorThrown);
                $('#infosProfil').html("<p>Erreur lors du chargement des informations du profil.</p>"); // Afficher un message d'erreur en cas d'échec
            }
        });
    }

    // Fonction pour afficher le suivi du sommeil (tableau simple)
    function afficherSuiviSommeil() {
        $.ajax({
            url: "../data/donnees_sommeil.json",
            dataType: "json", // Spécifier le type de données attendu
            success: function(data) {
                let sommeilHTML = '<table class="table table-bordered">';
                sommeilHTML += '<thead><tr><th>Date</th><th>Durée</th><th>Qualité</th></tr></thead><tbody>';
                $.each(data, function(index, sommeil) {
                    sommeilHTML += '<tr>';
                    sommeilHTML += '<td>' + sommeil.date + '</td>';
                    sommeilHTML += '<td>' + sommeil.duree + '</td>';
                    sommeilHTML += '<td>' + sommeil.qualite + '</td>';
                    sommeilHTML += '</tr>';
                });
                sommeilHTML += '</tbody></table>';
                $('#suiviSommeil').html(sommeilHTML);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Erreur lors du chargement des données de sommeil:", textStatus, errorThrown);
                $('#suiviSommeil').html("<p>Erreur lors du chargement du suivi du sommeil.</p>"); // Afficher un message d'erreur en cas d'échec
            }
        });
    }


    // Initialisations conditionnelles en fonction de la page
    if ($('#tableauActivites').length) {
        initialiserTableauActivites();
    }

    if ($('#conseilsNutrition').length) {
        afficherConseilsNutrition();
    }

    if ($('#infosProfil').length) {
        afficherInfosProfil();
    }

    if ($('#suiviSommeil').length) {
        afficherSuiviSommeil();
    }
});