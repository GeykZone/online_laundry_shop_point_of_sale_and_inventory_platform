<base href="./">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta name="description" content="CoreUI - Open Source Bootstrap Admin Template">
    <meta name="author" content="Łukasz Holeczek">
    <meta name="keyword" content="Bootstrap,Admin,Template,Open,Source,jQuery,CSS,HTML,RWD,Dashboard">
    <link rel="apple-touch-icon" sizes="57x57" href="assets/favicon/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="assets/favicon/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="assets/favicon/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="assets/favicon/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="assets/favicon/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="assets/favicon/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="assets/favicon/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="assets/favicon/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="assets/favicon/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192" href="assets/favicon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="assets/favicon/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon/favicon-16x16.png">
    <link rel="manifest" href="assets/favicon/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="assets/favicon/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">

    <!-- Vendors styles-->
    <link rel="stylesheet" href="vendors/simplebar/css/simplebar.css">
    <link rel="stylesheet" href="css/vendors/simplebar.css">

    <!-- Main styles for this application-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.css">
    <script
      src="https://code.jquery.com/jquery-3.7.1.js"
      integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4="
      crossorigin="anonymous">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link href="css/style.css" rel="stylesheet">
    <link href="vendors/@coreui/chartjs/css/coreui-chartjs.css" rel="stylesheet">
    <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.10/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script> -->
    <link href="https://cdn.datatables.net/v/dt/jszip-3.10.1/dt-1.13.8/af-2.6.0/b-2.4.2/b-colvis-2.4.2/b-html5-2.4.2/b-print-2.4.2/cr-1.7.0/date-1.5.1/fc-4.3.0/fh-3.4.0/kt-2.11.0/r-2.5.0/rg-1.4.1/rr-1.4.1/sc-2.3.0/sb-1.6.0/sp-2.2.0/sl-1.7.0/sr-1.3.0/datatables.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js"></script>
    <script src="https://cdn.datatables.net/v/dt/jszip-3.10.1/dt-1.13.8/af-2.6.0/b-2.4.2/b-colvis-2.4.2/b-html5-2.4.2/b-print-2.4.2/cr-1.7.0/date-1.5.1/fc-4.3.0/fh-3.4.0/kt-2.11.0/r-2.5.0/rg-1.4.1/rr-1.4.1/sc-2.3.0/sb-1.6.0/sp-2.2.0/sl-1.7.0/sr-1.3.0/datatables.min.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.11.0/firebase-storage-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.11.0/firebase-auth-compat.js"></script>

    <script src="js/common.js"></script>



    <style>

      :root {
        --star-color: #fff;
        --star-background: #fc0;
      }

      .Stars {
        --percent: calc(var(--rating) / 5 * 100%);
        
        display: inline-block;
        font-family: Times;
        line-height: 1;
        
        &::before {
          content: '★★★★★';
          letter-spacing: 3px;
          background: linear-gradient(90deg, var(--star-background) var(--percent), var(--star-color) var(--percent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }

      .isClickable{
        cursor: pointer;
      }

      div.dataTables_wrapper {
        width: 100% !important;
      }

      table.dataTable.no-footer {
        border-bottom: 1px solid rgb(255 255 255 / 0%);
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: rgba(255, 255, 255, 0);
      }

        /* Override the DataTables responsive icon */
        table.dataTable.dtr-inline.collapsed > tbody > tr > td:first-child::before {
          font-family: "Font Awesome 5 Free" !important;  /* Use FontAwesome icons */
          font-weight: 900;  /* Make sure to use the solid version of the icon */
          content: "\f055";  /* Example: FontAwesome fa-folder-open icon */
          margin-right: 10px;
          color: #007bff;  /* Change the color */
          font-size: 1.2rem;
      }

      /* You can also change the expanded row icon */
      table.dataTable.dtr-inline.collapsed > tbody > tr.parent > td:first-child::before {
          content: "\f056";  /* Example: FontAwesome fa-folder icon */
      }

      ::-webkit-scrollbar {
        width: 0.7vw;
        height: 1.5vh; 
      }
      ::-webkit-scrollbar-track {
        background-color: white;
      }
      ::-webkit-scrollbar-thumb {
        background: #c6ccd9;
        border-radius: 100px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #c6ccd9;
        cursor: pointer;
      }

    </style>
