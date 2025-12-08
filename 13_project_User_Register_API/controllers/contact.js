import { Contact } from "../Model/Contact.js";

export const newContact = async (req, res) => {
  const { name, email, phone, type } = req.body;

  if (name === "" || email === "" || phone === "" || type === "")
    return res.json({ message: "All fields are required!", success: false });

  //save in DB
  const createContact = await Contact.create({
    name,
    email,
    phone,
    type,
    user: req.user
  });

  return res.json({
    message: "Contact created successfully!",
    contactDetails: createContact,
    success: true,
  });
};

export const getAllContact = async (req,res) => {
    const allContact = await Contact.find()

    if(!allContact) return res.json({message: "No contacts available", success: false})

    return res.json({message:"All contact details", allContact: allContact, success: true});
}

export const getContactById = async(req,res) => {
    const id = req.params.id;
    const contactDetailById = await Contact.findById(id);

    if(!contactDetailById) return res.json({message: `No Contacts found for ${id}`});

    return res.json({message: "Contact Details", contactDetails: contactDetailById, success:true});
}

export const getContactByUserId = async(req,res) => {
    const id = req.params.id;
    const contactDetailByUserId = await Contact.find({user:id});

    if(!contactDetailByUserId) return res.json({message: `No Contacts found for ${id}`});

    return res.json({message: "Contact Details By User ID:- ", contactDetailsByUserID: contactDetailByUserId, success:true});
}

export const updatedContactById = async (req,res) => {
    const id = req.params.id;
    const { name, email, phone, type } = req.body;

    const updateContactDetailsById = await Contact.findByIdAndUpdate(id, {
        name,
        email,
        phone,
        type,
        user: req.user
    }, {new : true})

    if(!updateContactDetailsById) return res.json({message: "Contact details doesn't exists", success : false});

    return res.json({message: "Contacts updated successfully", updateContactDetailsById, success : true});
}

export const deleteContactById = async (req,res) => {
    const id = req.params.id;

    let deleteContactDetailsById = await Contact.findByIdAndDelete(id,{
        user: req.user
    });

    if(!deleteContactDetailsById) return res.json({message: "Contact details doesn't exists", success : false});

    return res.json({message: "Contacts deleted successfully", deleteContactDetailsById, success : true});
}