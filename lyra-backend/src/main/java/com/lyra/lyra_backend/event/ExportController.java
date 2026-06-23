package com.lyra.lyra_backend.event;

import com.lyra.lyra_backend.registration.Registration;
import com.lyra.lyra_backend.registration.RegistrationRepository;
import com.lyra.lyra_backend.role.Role;
import com.lyra.lyra_backend.role.RoleResolver;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/events")
public class ExportController {

    private final EventService eventService;
    private final RegistrationRepository registrationRepository;
    private final RoleResolver roleResolver;

    public ExportController(EventService eventService,
                            RegistrationRepository registrationRepository,
                            RoleResolver roleResolver) {
        this.eventService = eventService;
        this.registrationRepository = registrationRepository;
        this.roleResolver = roleResolver;
    }

    @GetMapping("/{id}/export")
    public ResponseEntity<byte[]> export(
            @PathVariable UUID id,
            @AuthenticationPrincipal Jwt jwt) throws Exception {

        String tgi = jwt.getClaimAsString("preferred_username");

        // seul un admin de service peut exporter
        if (roleResolver.getRole(tgi) != Role.SERVICE_ADMIN) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Seul un admin de service peut exporter un événement");
        }

        // l'event doit appartenir au même service que l'admin
        Event event = eventService.getById(id);
        UUID adminServiceId = roleResolver.getServiceId(tgi);
        if (!event.getServiceId().equals(adminServiceId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Cet événement n'appartient pas à votre service");
        }

        // récupérer les inscrits
        List<Registration> registrations = registrationRepository.findByEventId(id);

        // créer le fichier Excel
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Emargement");

        // style gras pour les en-têtes
        CellStyle headerStyle = workbook.createCellStyle();
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerStyle.setFont(headerFont);

        // ligne 0 : titre de l'event
        Row titleRow = sheet.createRow(0);
        Cell titleCell = titleRow.createCell(0);
        titleCell.setCellValue("Feuille d'émargement — " + event.getTitle());
        titleCell.setCellStyle(headerStyle);

        // ligne 1 : date + lieu
        Row infoRow = sheet.createRow(1);
        infoRow.createCell(0).setCellValue("Date : " + event.getEventDate());
        infoRow.createCell(1).setCellValue("Lieu : " + event.getLocation());

        // ligne 2 : vide (séparateur)
        sheet.createRow(2);

        // ligne 3 : en-têtes des colonnes
        Row headerRow = sheet.createRow(3);
        String[] headers = {"Nom", "Prénom", "TGI", "Secteur", "Signature"};
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(headerStyle);
        }

        // lignes de données : un inscrit par ligne
        int rowNum = 4;
        for (Registration reg : registrations) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(reg.getUserLastname() != null ? reg.getUserLastname() : "");
            row.createCell(1).setCellValue(reg.getUserFirstname() != null ? reg.getUserFirstname() : "");
            row.createCell(2).setCellValue(reg.getUserTgi());
            row.createCell(3).setCellValue(reg.getUserSecteur() != null ? reg.getUserSecteur() : "");
            // colonne Signature : vide et très large
            row.createCell(4).setCellValue("");
        }

        // auto-size sur toutes les colonnes sauf Signature
        for (int i = 0; i < 4; i++) {
            sheet.autoSizeColumn(i);
        }
        // colonne Signature très large (environ 8 cm)
        sheet.setColumnWidth(4, 8000);

        // écrire dans un tableau de bytes et fermer
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        workbook.write(out);
        workbook.close();

        // nom du fichier : emargement-titre-de-levent.xlsx
        String filename = "emargement-"
                + event.getTitle().toLowerCase().replaceAll("[^a-z0-9]", "-")
                + ".xlsx";

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .contentType(MediaType.parseMediaType(
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(out.toByteArray());
    }
}