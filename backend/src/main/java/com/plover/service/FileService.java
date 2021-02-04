package com.plover.service;

import com.plover.model.file.File;
import com.plover.model.file.request.FileRequest;
import com.plover.repository.FileRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class FileService {

    private FileRepository fileRepository;

    public FileService(FileRepository fileRepository){
        this.fileRepository = fileRepository;
    }

    @Transactional
    public Long saveFile(FileRequest fileRequest) {
        return fileRepository.save(fileRequest.toEntity()).getId();
    }

    @Transactional
    public FileRequest getFile(Long id) {
        File file = fileRepository.findById(id).get();

        FileRequest fileRequest = FileRequest.builder()
                .id(id)
                .origFilename(file.getOrigFilename())
                .filename(file.getFilename())
                .filePath(file.getFilePath())
                .build();
        return fileRequest;
    }
}
